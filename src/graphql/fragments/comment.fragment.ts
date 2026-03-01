import { gql } from '@apollo/client';
import { USER_BASIC_FIELDS } from './user.fragment';

/**
 * Comment Fragments
 * Contains fragment definitions for comment-related queries and mutations
 */

/**
 * Basic comment fields
 */
export const COMMENT_BASIC_FIELDS = gql`
  fragment CommentBasicFields on Comment {
    id
    content
    createdAt
    user {
      ...UserBasicFields
    }
  }
  ${USER_BASIC_FIELDS}
`;

/**
 * Comment with extended fields
 */
export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    content
    createdAt
    updatedAt
    parent_id
    likes
    liked
    user {
      ...UserBasicFields
    }
  }
  ${USER_BASIC_FIELDS}
`;

/**
 * Comment with replies
 */
export const COMMENT_WITH_REPLIES_FIELDS = gql`
  fragment CommentWithRepliesFields on Comment {
    id
    content
    createdAt
    updatedAt
    parent_id
    likes
    liked
    user {
      ...UserBasicFields
    }
    replies {
      ...CommentFields
    }
  }
  ${USER_BASIC_FIELDS}
`;
