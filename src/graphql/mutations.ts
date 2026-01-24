import { gql } from "@apollo/client";
import { LOGIN_MUTATION, REFRESH_TOKEN } from "./mutations/login.mutation";
import { SIGNUP_MUTATION } from "./mutations/signup.mutation";

// Check-in mutations
const CHECK_IN_MUTATION = gql`
  mutation CheckIn($latitude: Float!, $longitude: Float!, $timestamp: String!, $content: String) {
    checkIn(input: { latitude: $latitude, longitude: $longitude, timestamp: $timestamp, content: $content }) {
      id
      latitude
      longitude
      timestamp
      content
      user {
        id
        name
      }
      place {
        id
        name
      }
    }
  }
`;

const CHECK_IN_PLACE_MUTATION = gql`
  mutation CheckInPlace($placeId: ID!, $content: String, $media: [String]) {
    myCheckinForPlace(input: { placeId: $placeId, content: $content, media: $media }) {
      checkin {
        ...CHECKIN_FIELDS
    }
  }
`;

// Create place mutation (for adding new places)
const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlace($name: String!, $address: String!, $latitude: Float!, $longitude: Float!, $type: String!) {
    createPlace(input: { name: $name, address: $address, latitude: $latitude, longitude: $longitude, type: $type }) {
      success
      message
      place {
        id
        name
        coordinates
      }
    }
  }
`;

// Rewards mutations
const REDEEM_REWARD_MUTATION = gql`
  mutation RedeemReward($rewardId: ID!) {
    redeemReward(rewardId: $rewardId) {
      success
      message
      remainingPoints
    }
  }
`;

// Social mutations
const LIKE_CHECKIN_MUTATION = gql`
  mutation LikeCheckIn($checkinId: ID!) {
    likeCheckIn(checkinId: $checkinId) {
      success
      likeCount
    }
  }
`;

const COMMENT_CHECKIN_MUTATION = gql`
  mutation CommentCheckIn($checkinId: ID!, $content: String!) {
    commentCheckIn(checkinId: $checkinId, content: $content) {
      success
      comment {
        id
        content
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

// Profile mutations
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      message
      user {
        id
        name
        email
        phone
        avatar
        dateOfBirth
        gender
        location
        bio
      }
    }
  }
`;

const UPDATE_USER_AVATAR_MUTATION = gql`
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

const UPDATE_NOTIFICATION_SETTINGS_MUTATION = gql`
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

const UPDATE_PRIVACY_SETTINGS_MUTATION = gql`
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

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(input: { currentPassword: $currentPassword, newPassword: $newPassword }) {
      success
      message
    }
  }
`;

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount {
    deleteAccount {
      success
      message
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export {
  LOGIN_MUTATION,
  REFRESH_TOKEN,
  SIGNUP_MUTATION,
  CHECK_IN_MUTATION,
  CHECK_IN_PLACE_MUTATION,
  CREATE_PLACE_MUTATION,
  REDEEM_REWARD_MUTATION,
  LIKE_CHECKIN_MUTATION,
  COMMENT_CHECKIN_MUTATION,
  UPDATE_PROFILE_MUTATION,
  UPDATE_USER_AVATAR_MUTATION,
  UPDATE_NOTIFICATION_SETTINGS_MUTATION,
  UPDATE_PRIVACY_SETTINGS_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  DELETE_ACCOUNT_MUTATION,
  LOGOUT_MUTATION
};
