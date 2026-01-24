import { gql } from '@apollo/client';

export const USER_BASIC_FIELDS = gql`
  fragment UserBasicFields on User {
    id
    name
    email
    avatar
    bio
    country
    interests
    phone
    dateOfBirth
    gender
    location
    hobby
  }
`;

export const USER_SETTINGS_FIELDS = gql`
  fragment UserSettingsFields on User {
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
`;

export const USER_RELATIONS_FIELDS = gql`
  fragment UserRelationsFields on User {
    sentFriendRequests { id status }
    receivedFriendRequests { id status }
    checkins { id status mood }
    trips { id name }
    tripCollaborations { id role }
    followers { id name avatar }
    followings { id name avatar }
    likes { id }
    favoriteCheckins { id }
    favoritePlaces { id }
  }
`;

export const NOTIFICATION_SETTINGS_FIELDS = gql`
  fragment NotificationSettingsFields on NotificationSettings {
    pushNotifications
    emailNotifications
    smsNotifications
    promotions
    updates
    reminders
  }
`;

export const PRIVACY_SETTINGS_FIELDS = gql`
  fragment PrivacySettingsFields on PrivacySettings {
    locationAccess
    contactsAccess
    cameraAccess
    microphoneAccess
    profileVisibility
    activityStatus
  }
`;

export const SECURITY_SETTINGS_FIELDS = gql`
  fragment SecuritySettingsFields on SecuritySettings {
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
`;

// Fragment gom phần chung của Login/Signup/RefreshToken
export const ACCESS_TOKEN_FIELDS = gql`
  fragment AccessTokenFields on AccessTokenFields {
    accessToken
    refreshToken
  }
`;
