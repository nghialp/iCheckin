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
  fragment COMMENT_BASIC_FIELDS on Comment {
    id
    content
    createdAt
    user {
      ...USER_BASIC_FIELDS
    }
  }
  ${USER_BASIC_FIELDS}
`;

/**
 * Comment with extended fields
 */
export const COMMENT_FIELDS = gql`
  fragment COMMENT_FIELDS on Comment {
    id
    content
    createdAt
    updatedAt
    parent_id
    likes
    liked
    user {
      ...USER_BASIC_FIELDS
    }
  }
  ${USER_BASIC_FIELDS}
`;

/**
 * Comment with replies
 */
export const COMMENT_WITH_REPLIES_FIELDS = gql`
  fragment COMMENT_WITH_REPLIES_FIELDS on Comment {
    id
    content
    createdAt
    updatedAt
    parent_id
    likes
    liked
    user {
      ...USER_BASIC_FIELDS
    }
    replies {
      ...COMMENT_FIELDS
    }
  }
  ${USER_BASIC_FIELDS}
`;
