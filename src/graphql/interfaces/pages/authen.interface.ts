import { User } from "../entities/user.interface"

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