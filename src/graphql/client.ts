import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from '@apollo/client';
import { REFRESH_TOKEN } from './mutations';
import { refreshTokenResponse } from './types/authen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

// Use environment variable for GraphQL endpoint, fallback to localhost for development
const GRAPHQL_ENDPOINT: string = (Config.GRAPHQL_ENDPOINT as string) || 'http://localhost:3000/graphql';

// Default coordinates (can be overridden by environment variables)
export const DEFAULT_COORDINATES = {
  lat: parseFloat((Config.DEFAULT_LAT as string) || '10.762622'),
  lng: parseFloat((Config.DEFAULT_LNG as string) || '106.660172'),
};

export const useApolloClientWithAuth = () => {
  const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

  // ApolloLink middleware để gắn token từ context
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(async ({ headers = {} }) => {
      try {
          const raw = await AsyncStorage.getItem('auth_user');
          const parsed = raw ? JSON.parse(raw) : null;
          const token = parsed?.accessToken;

          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          };
        } catch (e) {
          return { headers };
        }
    });
    return forward(operation);
  });
    // Link xử lý lỗi thay cho onError
  const errorLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      const subscription = forward(operation).subscribe({
        next: async result => {
          const graphQLErrors = result?.errors;
          if (graphQLErrors?.some(err => err.extensions?.code === 'UNAUTHENTICATED')) {
            const raw = await AsyncStorage.getItem('auth_user');
            const parsed = raw ? JSON.parse(raw) : null;
            const refreshToken = parsed?.refreshToken;
            if (!refreshToken) {
              await AsyncStorage.removeItem('auth_user');
              observer.error(new Error('No refresh token'));
              return;
            }

            try {
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
              await AsyncStorage.setItem(
                'auth_user',
                JSON.stringify({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
                  user: parsed.user, // nếu bạn muốn lưu cả user
                }),
              );

              // Retry request với token mới
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }));

              forward(operation).subscribe(observer);
            } catch (e) {
              await AsyncStorage.removeItem('auth_user');
              observer.error(e);
            }
          } else {
            observer.next(result);
          }
        },
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });

      return () => subscription.unsubscribe();
    });
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export default useApolloClientWithAuth;
