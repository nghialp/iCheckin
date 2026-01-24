import { gql } from '@apollo/client';

export const RESEND_RESET_EMAIL = gql`
  mutation ResendResetEmail {
    resendResetEmail {
      success
      message
    }
  }
`;