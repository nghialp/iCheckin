/**
 * GraphQL Fragments Index
 * Centralized exports for all fragment definitions
 */

// User fragments
export {
  USER_BASIC_FIELDS,
  USER_DETAILS_FIELDS,
  USER_SETTINGS_FIELDS,
  USER_RELATIONS_FIELDS,
  NOTIFICATION_SETTINGS_FIELDS,
  PRIVACY_SETTINGS_FIELDS,
  SECURITY_SETTINGS_FIELDS,
  ACCESS_TOKEN_FIELDS,
} from './user.fragment';

// Place fragments
export {
  PLACE_FIELDS,
  MAP_PLACE_FIELDS,
} from './place.fragment';

// Check-in fragments
export {
  CHECKIN_FIELDS,
} from './checkin.fragment';

// Comment fragments
export {
  COMMENT_BASIC_FIELDS,
  COMMENT_FIELDS,
  COMMENT_WITH_REPLIES_FIELDS,
} from './comment.fragment';
