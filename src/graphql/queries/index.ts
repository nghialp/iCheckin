/**
 * GraphQL Queries Index
 * Centralized exports for all queries
 */

// Home page queries
export {
  GET_HOME_DATA,
} from './home.query';

// Map page queries
export {
  GET_NEARBY_PLACES,
  GET_CHECKIN_FEED,
} from './map.query';

// User/Profile queries
export {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SIMPLE,
  GET_USER_STATS,
  GET_MY_FRIENDS,
  GET_MY_FOLLOWINGS,
} from './user.query';

// Place queries
export {
  GET_PLACE_DETAIL,
  GET_PLACE_DETAIL_FULL,
  GET_PLACE_CHECKINS,
  SEARCH_PLACES,
} from './place.query';

// Reward queries
export {
  GET_REWARD_PAGE,
  GET_USER_REWARDS,
  GET_REWARD_DETAIL,
  GET_REDEEM_HISTORY,
  GET_REWARDS_BY_CATEGORY,
  GET_POPULAR_REWARDS,
} from './reward.query';
