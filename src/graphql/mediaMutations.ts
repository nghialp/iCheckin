import { gql } from '@apollo/client';

// Mutation để lưu media URLs vào backend
const ADD_MEDIA_TO_CHECKIN_MUTATION = gql`
  mutation AddMediaToCheckIn($checkinId: ID!, $mediaUrls: [String!]!) {
    addMediaToCheckIn(input: { checkinId: $checkinId, mediaUrls: $mediaUrls }) {
      success
      message
      media {
        id
        url
        checkinId
      }
    }
  }
`;

export { ADD_MEDIA_TO_CHECKIN_MUTATION };
