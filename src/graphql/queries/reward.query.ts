import { gql } from '@apollo/client';

/**
 * Reward Queries
 * Contains queries for reward and points system
 */

/**
 * Get rewards page data with user points and available rewards
 */
export const GET_REWARD_PAGE = gql`
  query GetRewardPage {
    me {
      id
      name
      rewardPoints
    }
    rewards {
      id
      title
      description
      imageUrl
      requiredPoints
      inStock
      partner
    }
  }
`;

/**
 * Get user rewards with pagination
 * @param limit - Number of rewards to return per page
 * @param offset - Offset for pagination
 */
export const GET_USER_REWARDS = gql`
  query GetUserRewards($limit: Int, $offset: Int) {
    userRewards(limit: $limit, offset: $offset) {
      currentPoints
      tier
      nextTierPoints
      totalRedeemed
      rewards {
        id
        title
        description
        image
        pointsRequired
        category
        partner
        inStock
        likes
        redeemed
        isLimited
        expiresAt
        tier
      }
    }
  }
`;

/**
 * Get detailed information about a specific reward
 * @param id - ID of the reward
 */
export const GET_REWARD_DETAIL = gql`
  query GetRewardDetail($id: ID!) {
    reward(id: $id) {
      id
      title
      description
      image
      pointsRequired
      category
      partner
      inStock
      likes
      redeemed
      isLimited
      expiresAt
      tier
      qrCode
      redeemCode
      partnerContact
      validUntil
    }
  }
`;

/**
 * Get user's redeem history with pagination
 * @param limit - Number of records to return
 * @param offset - Offset for pagination
 */
export const GET_REDEEM_HISTORY = gql`
  query GetRedeemHistory($limit: Int, $offset: Int) {
    redeemHistory(limit: $limit, offset: $offset) {
      id
      reward {
        id
        title
        image
        pointsRequired
      }
      redeemedAt
      status
      redeemCode
      expiresAt
    }
  }
`;

/**
 * Get available rewards by category
 * @param category - Category to filter rewards
 * @param limit - Number of rewards to return
 * @param offset - Offset for pagination
 */
export const GET_REWARDS_BY_CATEGORY = gql`
  query GetRewardsByCategory($category: String!, $limit: Int, $offset: Int) {
    rewardsByCategory(category: $category, limit: $limit, offset: $offset) {
      id
      title
      description
      image
      pointsRequired
      category
      partner
      inStock
      likes
      isLimited
      expiresAt
      tier
    }
  }
`;

/**
 * Get rewards trending/popular
 * @param limit - Number of rewards to return
 */
export const GET_POPULAR_REWARDS = gql`
  query GetPopularRewards($limit: Int) {
    popularRewards(limit: $limit) {
      id
      title
      description
      image
      pointsRequired
      category
      partner
      inStock
      likes
      isLimited
      expiresAt
      tier
    }
  }
`;
