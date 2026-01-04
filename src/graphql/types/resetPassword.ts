export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordVariables {
  newPassword: string;
}