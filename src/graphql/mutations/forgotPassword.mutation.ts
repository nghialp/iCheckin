import { gql } from '@apollo/client';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;

// Backward compatibility export
export const FORGET_PASSWORD = FORGOT_PASSWORD_MUTATION;