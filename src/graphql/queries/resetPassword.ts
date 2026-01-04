import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($newPassword: String!) {
    resetPassword(newPassword: $newPassword) {
      success
      message
    }
  }
`;