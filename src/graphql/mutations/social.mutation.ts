import { gql } from '@apollo/client';
import { COMMENT_FIELDS } from '../fragments/comment.fragment';

/**
 * Social Mutations
 * Contains mutations for likes, comments, and other social features
 */

/**
 * Like a check-in
 * @param checkinId - ID of the check-in to like
 */
export const LIKE_CHECKIN_MUTATION = gql`
  mutation LikeCheckIn($checkinId: ID!) {
    likeCheckIn(checkinId: $checkinId) {
      success
      likeCount
    }
  }
`;

/**
 * Unlike a check-in
 * @param checkinId - ID of the check-in to unlike
 */
export const UNLIKE_CHECKIN_MUTATION = gql`
  mutation UnlikeCheckIn($checkinId: ID!) {
    unlikeCheckIn(checkinId: $checkinId) {
      success
      likeCount
    }
  }
`;

/**
 * Comment on a check-in
 * @param checkinId - ID of the check-in to comment on
 * @param content - Comment content/text
 * @param parentId - Optional parent comment ID for replies
 */
export const COMMENT_CHECKIN_MUTATION = gql`
  mutation CommentCheckIn($checkinId: ID!, $content: String!, $parentId: String) {
    commentCheckIn(checkinId: $checkinId, content: $content, parentId: $parentId) {
      success
      comment {
        ...CommentFields
      }
    }
  }
  ${COMMENT_FIELDS}
`;

/**
 * Delete a comment
 * @param commentId - ID of the comment to delete
 */
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      success
      message
    }
  }
`;

/**
 * Like a comment
 * @param commentId - ID of the comment to like
 */
export const LIKE_COMMENT_MUTATION = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      success
      likeCount
    }
  }
`;

/**
 * Follow a user
 * @param userId - ID of the user to follow
 */
export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      success
      message
    }
  }
`;

/**
 * Unfollow a user
 * @param userId - ID of the user to unfollow
 */
export const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      success
      message
    }
  }
`;

/**
 * Send a friend request
 * @param userId - ID of the user to send request to
 */
export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SendFriendRequest($userId: ID!) {
    sendFriendRequest(userId: $userId) {
      success
      message
    }
  }
`;

/**
 * Accept a friend request
 * @param friendRequestId - ID of the friend request
 */
export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation AcceptFriendRequest($friendRequestId: ID!) {
    acceptFriendRequest(friendRequestId: $friendRequestId) {
      success
      message
    }
  }
`;

/**
 * Decline a friend request
 * @param friendRequestId - ID of the friend request
 */
export const DECLINE_FRIEND_REQUEST_MUTATION = gql`
  mutation DeclineFriendRequest($friendRequestId: ID!) {
    declineFriendRequest(friendRequestId: $friendRequestId) {
      success
      message
    }
  }
`;
