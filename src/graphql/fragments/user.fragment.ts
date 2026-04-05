import { gql } from '@apollo/client';

export const USER_BASIC_FIELDS = gql`
  fragment USER_BASIC_FIELDS on User {
    id
    name
    email
    avatar
    interests
    country
  }
`;

export const USER_BASIC_INFO_FIELDS = gql`
  fragment USER_BASIC_INFO_FIELDS on UserBasicInfo {
    id
    name
    email
    avatar
    phone
    dateOfBirth
    gender
    location
    bio
  }
`;

export const USER_DETAILS_FIELDS = gql`
  fragment USER_DETAILS_FIELDS on User {
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
  fragment USER_SETTINGS_FIELDS on User {
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
  fragment USER_RELATIONS_FIELDS on User {
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
  fragment NOTIFICATION_SETTINGS_FIELDS on NotificationSettings {
    pushNotifications
    emailNotifications
    smsNotifications
    promotions
    updates
    reminders
  }
`;

export const PRIVACY_SETTINGS_FIELDS = gql`
  fragment PRIVACY_SETTINGS_FIELDS on PrivacySettings {
    locationAccess
    contactsAccess
    cameraAccess
    microphoneAccess
    profileVisibility
    activityStatus
  }
`;

export const SECURITY_SETTINGS_FIELDS = gql`
  fragment SECURITY_SETTINGS_FIELDS on SecuritySettings {
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
  fragment ACCESS_TOKEN_FIELDS on AccessTokenFields {
    accessToken
    refreshToken
  }
`;
