import React, { createContext, useCallback, useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations';
import { LoginInput, LoginResponse, SignupInput, SignupResponse } from '../graphql/types/authen';
import { User } from '../graphql/types/user';

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
}

export type AuthContextValue = {
  auth: AuthState;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: any;
  login: (email: string, password: string, remember: boolean) => Promise<LoginResponse | null>;
  signUp: (name: string, email: string, password: string) => Promise<SignupResponse | null>;
  logout: () => Promise<void>;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({});
  const [user, setUser] = useState<User | null>(null);
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
        const errorsArray = err.errors[0].extensions?.originalError?.message || errors || 'Signup failed';
        const errorsObj: any = {};
        errorsArray.forEach((error: any) => {
          errorsObj[error.field] = { message: error.message };
        });
        console.log('error message:', errorsObj);
        setErrors(errorsObj);
        return null;
      }
    },
    [loginMutation]
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
        const errorsArray = err.errors[0].extensions?.originalError?.message || errors || 'Signup failed';
        const errorsObj: any = {};
        errorsArray.forEach((error: any) => {
          errorsObj[error.field] = { message: error.message };
        });
        setErrors(errorsObj);
        return null;
      }
    },
    [signUpMutation]
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

