import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations';
import { UserBasic } from '../graphql/interfaces/entities/user.interface';
import { LoginInput, LoginResponse, SignupInput, SignupResponse } from '../graphql/interfaces/pages/authen.interface';

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
}

export type AuthContextValue = {
  auth: AuthState;
  user: UserBasic | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: any;
  login: (email: string, password: string, remember: boolean) => Promise<LoginResponse | null>;
  signUp: (name: string, email: string, password: string) => Promise<SignupResponse | null>;
  logout: () => Promise<void>;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  clearError: () => void;
  /** Update user data in global context - useful after mutations */
  updateUser: (userData: Partial<UserBasic>) => void;
  /** Refresh user data from server */
  refreshUserData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({});
  const [user, setUser] = useState<UserBasic | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  // Sử dụng useRef để lưu trữ error và có thể clear được
  const [errors, setErrors] = useState<any>(null);
  const loginMutation = useMutation<LoginResponse, LoginInput>(LOGIN_MUTATION)[0];
  const signUpMutation = useMutation<SignupResponse, SignupInput>(SIGNUP_MUTATION)[0];

  useEffect(() => {
    (async () => {
      try {
        setErrors(null);
        const raw = await AsyncStorage.getItem('auth_user');
        if (raw) {
          const parsed = JSON.parse(raw);
          setAuth({
            accessToken: parsed.accessToken,
            refreshToken: parsed.refreshToken,
          });
          setUser(parsed.user);
        }
      } catch (e) {
        // ignore
      } finally {
        setInitialLoading(false);
      }
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      setErrors(null); // Clear error trước khi gọi API
      try {
        const res = await loginMutation({
          variables: { input: { email, password } },
        });
        const logged: LoginResponse | undefined = res?.data;
        if (logged?.login && logged?.login.user) {
          setUser(logged.login.user);
          setAuth({
            accessToken: logged.login.accessToken,
            refreshToken: logged.login.refreshToken,
          });
          if (remember) {
            await AsyncStorage.setItem('auth_user', JSON.stringify(logged.login));
            return logged;
          } else {
            await AsyncStorage.removeItem('auth_user');
          }
        }
        return null;
      } catch (err: any) {
        console.error('[Login] Error caught:', err);
        const errorsObj: any = {};
        
        // Log full error object for debugging
        console.log('[Login] Full error object:', JSON.stringify(err, null, 2));
        
        // Handle different error formats from GraphQL
        try {
          // Try to extract error from GraphQL response
          if (err.graphQLErrors && err.graphQLErrors.length > 0) {
            const gqlError = err.graphQLErrors[0];
            console.log('[Login] GraphQL Error:', gqlError);
            
            const errorMessage = gqlError.extensions?.originalError?.message || gqlError.message;
            
            if (Array.isArray(errorMessage)) {
              // Handle array format (e.g., [{ field: 'email', message: '...' }])
              errorMessage.forEach((error: any) => {
                errorsObj[error.field] = { message: error.message };
              });
            } else if (typeof errorMessage === 'string') {
              // Handle string format
              errorsObj.general = { message: errorMessage };
            } else {
              errorsObj.general = { message: 'An error occurred during login' };
            }
          } else if (err.networkError) {
            console.log('[Login] Network Error:', err.networkError);
            errorsObj.general = { 
              message: err.networkError.message || 'Network error - check your connection and GraphQL endpoint' 
            };
          } else if (err.message) {
            // Fallback to error message
            console.log('[Login] Generic Error:', err.message);
            errorsObj.general = { message: err.message };
          } else {
            errorsObj.general = { message: 'An unknown error occurred during login' };
          }
        } catch (parseError) {
          console.error('[Login] Error parsing login error:', parseError);
          errorsObj.general = { message: 'An error occurred during login' };
        }
        
        console.log('[Login] Processed error object:', errorsObj);
        setErrors(errorsObj);
        return null;
      }
    },
    [loginMutation, errors]
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      setErrors(null); // Clear error trước khi gọi API
      try {
        const res = await signUpMutation({ variables: { input: { name, email, password } } });
        const logged: SignupResponse | undefined = res?.data;
        if (logged?.signup && logged?.signup.user) {
          setUser(logged.signup.user);
          setAuth({
            accessToken: logged.signup.accessToken,
            refreshToken: logged.signup.refreshToken,
          });
          await AsyncStorage.setItem('auth_user', JSON.stringify(logged.signup));
          return logged;
        }
        return null;
      } catch (err: any) {
        console.error('[SignUp] Error caught:', err);
        const errorsObj: any = {};
        
        // Log full error object for debugging
        console.log('[SignUp] Full error object:', JSON.stringify(err, null, 2));
        
        // Handle different error formats from GraphQL
        try {
          // Try to extract error from GraphQL response
          if (err.graphQLErrors && err.graphQLErrors.length > 0) {
            const gqlError = err.graphQLErrors[0];
            console.log('[SignUp] GraphQL Error:', gqlError);
            
            const errorMessage = gqlError.extensions?.originalError?.message || gqlError.message;
            
            if (Array.isArray(errorMessage)) {
              // Handle array format (e.g., [{ field: 'email', message: '...' }])
              errorMessage.forEach((error: any) => {
                errorsObj[error.field] = { message: error.message };
              });
            } else if (typeof errorMessage === 'string') {
              // Handle string format
              errorsObj.general = { message: errorMessage };
            } else {
              errorsObj.general = { message: 'An error occurred during signup' };
            }
          } else if (err.networkError) {
            console.log('[SignUp] Network Error:', err.networkError);
            errorsObj.general = { 
              message: err.networkError.message || 'Network error - check your connection and GraphQL endpoint' 
            };
          } else if (err.message) {
            // Fallback to error message
            console.log('[SignUp] Generic Error:', err.message);
            errorsObj.general = { message: err.message };
          } else {
            errorsObj.general = { message: 'An unknown error occurred during signup' };
          }
        } catch (parseError) {
          console.error('[SignUp] Error parsing signup error:', parseError);
          errorsObj.general = { message: 'An error occurred during signup' };
        }
        
        console.log('[SignUp] Processed error object:', errorsObj);
        setErrors(errorsObj);
        return null;
      }
    },
    [signUpMutation, errors]
  );

  const logout = useCallback(async () => {
    setUser(null);
    setAuth({});
    setErrors(null);
    await AsyncStorage.removeItem('auth_user');
  }, []);

  const clearError = useCallback(() => {
    setErrors(null);
  }, []);

  /**
   * Update user data in global context
   * Useful for updating UI immediately after mutations
   */
  const updateUser = useCallback((userData: Partial<UserBasic>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, ...userData };
      
      // Also update AsyncStorage to persist changes
      const saveToStorage = async () => {
        try {
          const raw = await AsyncStorage.getItem('auth_user');
          if (raw) {
            const parsed = JSON.parse(raw);
            parsed.user = updatedUser;
            await AsyncStorage.setItem('auth_user', JSON.stringify(parsed));
          }
        } catch (e) {
          console.log('Error updating AsyncStorage:', e);
        }
      };
      saveToStorage();
      
      return updatedUser;
    });
  }, []);

  /**
   * Refresh user data from server
   * This would typically call a GraphQL query to get fresh user data
   */
  const refreshUserData = useCallback(async () => {
    // In a real implementation, this would:
    // 1. Call a GraphQL query to fetch fresh user data
    // 2. Update the user state with the new data
    // 3. Update AsyncStorage with the new data
    
    console.log('Refreshing user data...');
    // Placeholder: In production, you would fetch fresh data here
    // const { data } = await client.query({ query: GET_USER_PROFILE });
    // if (data?.user) setUser(data.user);
  }, []);

  const value: AuthContextValue = {
    auth,
    user,
    isAuthenticated: !!user,
    loading: initialLoading,
    errors,
    login,
    signUp,
    logout,
    setAuth,
    clearError,
    updateUser,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

