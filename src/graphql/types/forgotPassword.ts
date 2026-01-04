export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordVariables {
  email: string;
}