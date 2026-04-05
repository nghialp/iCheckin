import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from '@apollo/client';
import { REFRESH_TOKEN } from './mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { refreshTokenResponse } from './interfaces/pages/authen.interface';

// Global callback để xử lý unauthenticated
let onUnauthenticated: (() => void) | null = null;

export const setOnUnauthenticatedCallback = (callback: (() => void) | null) => {
  onUnauthenticated = callback;
};

// Use environment variable for GraphQL endpoint, fallback to localhost for development
const GRAPHQL_ENDPOINT: string = (Config.GRAPHQL_ENDPOINT as string) || 'http://localhost:3000/graphql';

// Default coordinates (can be overridden by environment variables)
export const DEFAULT_COORDINATES = {
  lat: parseFloat((Config.DEFAULT_LAT as string) || '10.762622'),
  lng: parseFloat((Config.DEFAULT_LNG as string) || '106.660172'),
};

export const useApolloClientWithAuth = () => {
  const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

  // Logging link to debug all requests
  const loggingLink = new ApolloLink((operation, forward) => {
    console.log(`🔵 [GraphQL] ${operation.operationName}`, {
      variables: operation.variables,
      query: operation.query.loc?.source.body.substring(0, 100),
    });

    return new Observable(observer => {
      const subscription = forward(operation).subscribe({
        next: result => {
          if (result.errors) {
            console.error(`⚠️ [GraphQL] ${operation.operationName} has errors`, result.errors);
          } else {
            console.log(`✅ [GraphQL] ${operation.operationName} success`);
          }
          observer.next(result);
        },
        error: err => {
          console.error(`❌ [GraphQL] ${operation.operationName} error`, {
            message: err.message,
            graphQLErrors: err.graphQLErrors,
            networkError: err.networkError,
          });
          observer.error(err);
        },
        complete: () => {
          observer.complete();
        },
      });

      return () => subscription.unsubscribe();
    });
  });

  // ApolloLink middleware để gắn token từ context
  const authLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let subscription: any;
      let completed = false;

      (async () => {
        try {
          if (completed) return;

          const raw = await AsyncStorage.getItem('auth_user');
          const parsed = raw ? JSON.parse(raw) : null;
          const token = parsed?.accessToken;

          if (operation.operationName === 'UpdateProfile') {
            console.log(`🔐 [Auth] ${operation.operationName} - Token:`, token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
          }

          operation.setContext({
            headers: {
              ...operation.getContext().headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          });

          if (completed) return;

          subscription = forward(operation).subscribe({
            next: value => {
              if (!completed) {
                observer.next(value);
              }
            },
            error: err => {
              if (!completed) {
                completed = true;
                observer.error(err);
              }
            },
            complete: () => {
              if (!completed) {
                completed = true;
                observer.complete();
              }
            },
          });
        } catch (e) {
          if (!completed) {
            completed = true;
            observer.error(e);
          }
        }
      })();

      return () => {
        completed = true;
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    });
  });

  // Link xử lý lỗi thay cho onError
  const errorLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      let subscription: any;

      const handleError = async (result: any) => {
        const graphQLErrors = result?.errors;
        if (graphQLErrors?.some((err: any) => err.extensions?.code === 'UNAUTHENTICATED')) {
          console.error('[GqlAuthGuard] UNAUTHENTICATED - Attempting token refresh...');
          try {
            const raw = await AsyncStorage.getItem('auth_user');
            const parsed = raw ? JSON.parse(raw) : null;
            const refreshToken = parsed?.refreshToken;
            
            if (!refreshToken) {
              console.error('[GqlAuthGuard] No refresh token found - logging out');
              await AsyncStorage.removeItem('auth_user');
              if (onUnauthenticated) {
                onUnauthenticated();
              }
              observer.error(new Error('No refresh token'));
              return;
            }

            // tạo client tạm để gọi mutation refreshToken
            const refreshClient = new ApolloClient({
              link: httpLink,
              cache: new InMemoryCache(),
            });

            const res = await refreshClient.mutate<refreshTokenResponse>({
              mutation: REFRESH_TOKEN,
              variables: { refreshToken },
            });

            const newAccessToken = res?.data?.refreshToken?.accessToken;
            const newRefreshToken = res?.data?.refreshToken?.refreshToken;
            
            if (!newAccessToken || !newRefreshToken) {
              console.error('[GqlAuthGuard] Token refresh failed - no tokens received');
              throw new Error('No tokens received from refresh');
            }

            console.log('[GqlAuthGuard] Token refreshed successfully - retrying request');
            await AsyncStorage.setItem(
              'auth_user',
              JSON.stringify({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                user: parsed.user,
              }),
            );

            // Retry request với token mới
            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${newAccessToken}`,
              },
            }));

            // Properly forward the retried operation
            subscription = forward(operation).subscribe({
              next: newResult => observer.next(newResult),
              error: err => observer.error(err),
              complete: () => observer.complete(),
            });
          } catch (e) {
            console.error('[GqlAuthGuard] Token refresh failed:', (e as Error).message);
            await AsyncStorage.removeItem('auth_user');
            // 🔥 FIX: Gọi callback để redirect sang login
            if (onUnauthenticated) {
              console.warn('[GqlAuthGuard] Triggering logout callback');
              onUnauthenticated();
            }
            observer.error(e);
          }
        } else if (graphQLErrors?.some((err: any) => err.extensions?.code === 'FORBIDDEN' || err.extensions?.code === 'UNAUTHORIZED')) {
          // Xử lý các lỗi token không hợp lệ khác
          console.error('[GqlAuthGuard] FORBIDDEN/UNAUTHORIZED - logging out');
          await AsyncStorage.removeItem('auth_user');
          if (onUnauthenticated) {
            onUnauthenticated();
          }
          observer.error(new Error('Token invalid'));
        } else {
          // ✅ Emit result and complete
          observer.next(result);
          observer.complete();
        }
      };

      subscription = forward(operation).subscribe({
        next: async result => {
          await handleError(result);
        },
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    });
  });

  return new ApolloClient({
    link: ApolloLink.from([loggingLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export default useApolloClientWithAuth;
