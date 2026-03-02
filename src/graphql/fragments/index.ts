/**
 * GraphQL Fragments Index
 * Centralized exports for all fragment definitions
 * Use these fragments to avoid duplication in queries and mutations
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

// Place fragments - Main reusable place fragments
export {
  PLACE_FIELDS,
  MAP_PLACE_FIELDS,
  PLACE_DETAIL_FIELDS,
  PLACE_WITH_CHECKINS_FIELDS,
  SEARCH_PLACE_FIELDS,
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
