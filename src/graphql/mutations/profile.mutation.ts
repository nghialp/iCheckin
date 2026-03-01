import { gql } from '@apollo/client';
import { USER_DETAILS_FIELDS } from '../fragments/user.fragment';

/**
 * Profile Mutations
 * Contains mutations for user profile management
 */

/**
 * Update user profile information
 * @param input - Profile update input object with fields like name, email, bio, etc.
 */
export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      message
      user {
        ...UserDetailsFields
      }
    }
  }
  ${USER_DETAILS_FIELDS}
`;

/**
 * Update user avatar
 * @param avatarUrl - URL of the new avatar image
 */
export const UPDATE_USER_AVATAR_MUTATION = gql`
  mutation UpdateUserAvatar($avatarUrl: String!) {
    updateUserAvatar(avatarUrl: $avatarUrl) {
      success
      message
      user {
        id
        avatar
      }
    }
  }
`;

/**
 * Update notification settings
 * @param input - Notification settings input object
 */
export const UPDATE_NOTIFICATION_SETTINGS_MUTATION = gql`
  mutation UpdateNotificationSettings($input: NotificationSettingsInput!) {
    updateNotificationSettings(input: $input) {
      success
      message
      notificationSettings {
        pushNotifications
        emailNotifications
        smsNotifications
        promotions
        updates
        reminders
      }
    }
  }
`;

/**
 * Update privacy settings
 * @param input - Privacy settings input object
 */
export const UPDATE_PRIVACY_SETTINGS_MUTATION = gql`
  mutation UpdatePrivacySettings($input: PrivacySettingsInput!) {
    updatePrivacySettings(input: $input) {
      success
      message
      privacySettings {
        locationAccess
        contactsAccess
        cameraAccess
        microphoneAccess
        profileVisibility
        activityStatus
      }
    }
  }
`;

/**
 * Change user password
 * @param currentPassword - Current password for verification
 * @param newPassword - New password to set
 */
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(input: { currentPassword: $currentPassword, newPassword: $newPassword }) {
      success
      message
    }
  }
`;

/**
 * Delete user account
 */
export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount {
    deleteAccount {
      success
      message
    }
  }
`;

/**
 * Logout user
 */
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;
