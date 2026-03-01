import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $userId: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      userId: $userId
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`;