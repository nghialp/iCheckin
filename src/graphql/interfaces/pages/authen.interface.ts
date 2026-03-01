import { User, UserBasic } from "../entities/user.interface"

// INPUT INTERFACES
export interface LoginInput {
    input: {
        email: String
        password: String
    }
}

export interface SignupInput {
    input: {
        name: String
        email: String
        password: String
    }
}

export interface ResetPasswordInput {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

// Input variables
export interface ForgetPasswordInput {
  email: string;
}

// RESPONSE INTERFACES
export interface LoginResponse {
    login: {
        accessToken: string;
        refreshToken: string;
        user: User;
    }
}

export interface SignupResponse {
    signup: {
        accessToken: string;
        refreshToken: string;
        user: User;
    }
}

export interface refreshTokenResponse {
    refreshToken: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserBasic;
}

// Response của mutation
export interface ChangePasswordResponse {
  changePassword: AuthResponse;
}

// Response của mutation
export interface ForgetPasswordResponse {
  forgetPassword: AuthResponse;
}