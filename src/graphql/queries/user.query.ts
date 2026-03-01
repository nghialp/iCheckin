import { gql } from '@apollo/client';
import { NOTIFICATION_SETTINGS_FIELDS, PRIVACY_SETTINGS_FIELDS, SECURITY_SETTINGS_FIELDS, USER_DETAILS_FIELDS } from '../fragments/user.fragment';

/**
 * GET_USER_PROFILE Query
 * Fetches complete user profile data including:
 * - Basic info (name, email, avatar, bio, etc.)
 * - Notification settings
 * - Privacy settings
 * - Security settings
 * 
 * This query is optimized for cache-first strategy:
 * - Fast navigation with cached data
 * - Consistent state across all screens
 * - Reduced API calls
 */
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      ...USER_DETAILS_FIELDS
      
      # Notification Settings
      notificationSettings {
        ...NOTIFICATION_SETTINGS_FIELDS
      }
      
      # Privacy Settings
      privacySettings {
        ...PRIVACY_SETTINGS_FIELDS
      }
      
      # Security Settings
      securitySettings {
        ...SECURITY_SETTINGS_FIELDS
      }
      
      # Stats (for profile display)
      rewardPoints
      totalCheckins
      totalBadges
      visitedPlaces
    }
  }
    ${USER_DETAILS_FIELDS}
    ${NOTIFICATION_SETTINGS_FIELDS}
    ${PRIVACY_SETTINGS_FIELDS}
    ${SECURITY_SETTINGS_FIELDS}`;

/**
 * GET_USER_PROFILE_SIMPLE Query
 * Lightweight version for screens that don't need all settings
 */
export const GET_USER_PROFILE_SIMPLE = gql`
  query GetUserProfileSimple {
    me {
      ...USER_DETAILS_FIELDS
    }
  }
    ${USER_DETAILS_FIELDS}
`;

/**
 * GET_USER_STATS Query
 * Fetches user statistics:
 * - Reward points
 * - Total check-ins
 * - Total badges
 * - Visited places count
 */
export const GET_USER_STATS = gql`
  query GetUserStats {
    me {
      id
      name
      rewardPoints
      totalCheckins
      totalBadges
      visitedPlaces
    }
  }
`;

/**
 * GET_MY_FRIENDS Query
 * Fetches list of user's friends
 */
export const GET_MY_FRIENDS = gql`
  query GetMyFriends {
    myFriends {
      id
      name
      avatar
      bio
      country
    }
  }
`;

/**
 * GET_MY_FOLLOWINGS Query
 * Fetches list of users that the current user is following
 */
export const GET_MY_FOLLOWINGS = gql`
  query GetMyFollowings {
    myFollowings {
      id
      name
      avatar
      bio
      country
    }
  }
`;
