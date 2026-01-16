import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
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