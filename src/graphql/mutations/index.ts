/**
 * GraphQL Mutations Index
 * Centralized exports for all mutations
 */

// Authentication mutations
export {
  LOGIN_MUTATION,
  REFRESH_TOKEN,
} from './login.mutation';

export {
  SIGNUP_MUTATION,
} from './signup.mutation';

export {
  FORGOT_PASSWORD_MUTATION,
  FORGET_PASSWORD, // Backward compatibility
} from './forgotPassword.mutation';

export {
  CHANGE_PASSWORD,
} from './resetPassword.mutation';

export {
  RESEND_RESET_EMAIL,
} from './confirmMail.mutation';

// Check-in mutations
export {
  CHECK_IN_PLACE_MUTATION,
  CHECK_IN_MUTATION,
  UPDATE_CHECKIN_MUTATION,
  DELETE_CHECKIN_MUTATION,
} from './checkin.mutation';

// Place mutations
export {
  CREATE_PLACE_MUTATION,
  UPDATE_PLACE_MUTATION,
  DELETE_PLACE_MUTATION,
} from './place.mutation';

// Profile mutations
export {
  UPDATE_PROFILE_MUTATION,
  UPDATE_USER_AVATAR_MUTATION,
  UPDATE_NOTIFICATION_SETTINGS_MUTATION,
  UPDATE_PRIVACY_SETTINGS_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  DELETE_ACCOUNT_MUTATION,
  LOGOUT_MUTATION,
} from './profile.mutation';

// Social mutations
export {
  LIKE_CHECKIN_MUTATION,
  UNLIKE_CHECKIN_MUTATION,
  COMMENT_CHECKIN_MUTATION,
  DELETE_COMMENT_MUTATION,
  LIKE_COMMENT_MUTATION,
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
  SEND_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION,
  DECLINE_FRIEND_REQUEST_MUTATION,
} from './social.mutation';

// Reward mutations
export {
  REDEEM_REWARD_MUTATION,
  LIKE_REWARD_MUTATION,
  UNLIKE_REWARD_MUTATION,
  SHARE_REWARD_MUTATION,
} from './reward.mutation';

// Media mutations (from root folder mediaMutations.ts)
// export {
//   ADD_MEDIA_TO_CHECKIN_MUTATION,
// } from '../mediaMutations';

