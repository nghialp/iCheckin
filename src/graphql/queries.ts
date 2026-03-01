/**
 * GraphQL Queries
 * Re-exports queries from dedicated files for backward compatibility
 * 
 * Note: New queries should be added to their respective dedicated files:
 * - Home: queries/home.query.ts
 * - Map: queries/map.query.ts
 * - User: queries/user.query.ts
 * - Place: queries/place.query.ts
 * - Reward: queries/reward.query.ts
 */

// For backward compatibility, export from individual files
export {
  GET_HOME_DATA,
} from './queries/home.query';

export {
  GET_NEARBY_PLACES,
  GET_CHECKIN_FEED,
} from './queries/map.query';

export {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SIMPLE,
  GET_USER_STATS,
  GET_MY_FRIENDS,
  GET_MY_FOLLOWINGS,
} from './queries/user.query';

export {
  GET_PLACE_DETAIL,
  GET_PLACE_DETAIL_FULL,
  GET_PLACE_CHECKINS,
  SEARCH_PLACES,
} from './queries/place.query';

export {
  GET_REWARD_PAGE,
  GET_USER_REWARDS,
  GET_REWARD_DETAIL,
  GET_REDEEM_HISTORY,
  GET_REWARDS_BY_CATEGORY,
  GET_POPULAR_REWARDS,
} from './queries/reward.query';

