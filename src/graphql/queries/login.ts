import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        avatar
        phone
        dateOfBirth
        gender
        location
        bio
        notificationSettings {
          pushNotifications
          emailNotifications
          smsNotifications
          promotions
          updates
          reminders
        }
        privacySettings {
          locationAccess
          contactsAccess
          cameraAccess
          microphoneAccess
          profileVisibility
          activityStatus
        }
        securitySettings {
          twoFactorEnabled
          loginHistory {
            timestamp
            device
            ip
            location
            status
          }
          connectedDevices {
            id
            name
            type
            lastActive
          }
        }
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;