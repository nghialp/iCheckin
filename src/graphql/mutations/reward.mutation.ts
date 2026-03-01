import { gql } from '@apollo/client';

/**
 * Reward Mutations
 * Contains mutations for reward system functionality
 */

/**
 * Redeem a reward
 * @param rewardId - ID of the reward to redeem
 */
export const REDEEM_REWARD_MUTATION = gql`
  mutation RedeemReward($rewardId: ID!) {
    redeemReward(rewardId: $rewardId) {
      success
      message
      remainingPoints
      redeemHistory {
        id
        reward {
          id
          title
        }
        redeemedAt
        status
      }
    }
  }
`;

/**
 * Like a reward
 * @param rewardId - ID of the reward to like
 */
export const LIKE_REWARD_MUTATION = gql`
  mutation LikeReward($rewardId: ID!) {
    likeReward(rewardId: $rewardId) {
      success
      likeCount
    }
  }
`;

/**
 * Unlike a reward
 * @param rewardId - ID of the reward to unlike
 */
export const UNLIKE_REWARD_MUTATION = gql`
  mutation UnlikeReward($rewardId: ID!) {
    unlikeReward(rewardId: $rewardId) {
      success
      likeCount
    }
  }
`;

/**
 * Share a reward
 * @param rewardId - ID of the reward to share
 * @param medium - Where to share (facebook, twitter, instagram, etc.)
 */
export const SHARE_REWARD_MUTATION = gql`
  mutation ShareReward($rewardId: ID!, $medium: String!) {
    shareReward(rewardId: $rewardId, medium: $medium) {
      success
      message
    }
  }
`;
