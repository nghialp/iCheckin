import { gql } from "@apollo/client";
import { LOGIN_MUTATION, REFRESH_TOKEN } from "../graphql/queries/login";
import { SIGNUP_MUTATION } from "./queries/signup";

// Check-in mutations
const CHECK_IN_MUTATION = gql`
  mutation CheckIn($latitude: Float!, $longitude: Float!, $timestamp: String!, $content: String) {
    checkIn(input: { latitude: $latitude, longitude: $longitude, timestamp: $timestamp, content: $content }) {
      id
      latitude
      longitude
      timestamp
      content
      user {
        id
        name
      }
      place {
        id
        name
      }
    }
  }
`;

const CHECK_IN_PLACE_MUTATION = gql`
  mutation CheckInPlace($placeId: ID!, $content: String, $media: [String]) {
    checkInPlace(input: { placeId: $placeId, content: $content, media: $media }) {
      success
      message
      checkin {
        id
        checkedAt
        content
        media {
          id
          url
        }
        place {
          id
          name
        }
      }
    }
  }
`;

// Create place mutation (for adding new places)
const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlace($name: String!, $address: String!, $latitude: Float!, $longitude: Float!, $type: String!) {
    createPlace(input: { name: $name, address: $address, latitude: $latitude, longitude: $longitude, type: $type }) {
      success
      message
      place {
        id
        name
        coordinates
      }
    }
  }
`;

// Rewards mutations
const REDEEM_REWARD_MUTATION = gql`
  mutation RedeemReward($rewardId: ID!) {
    redeemReward(rewardId: $rewardId) {
      success
      message
      remainingPoints
    }
  }
`;

// Social mutations
const LIKE_CHECKIN_MUTATION = gql`
  mutation LikeCheckIn($checkinId: ID!) {
    likeCheckIn(checkinId: $checkinId) {
      success
      likeCount
    }
  }
`;

const COMMENT_CHECKIN_MUTATION = gql`
  mutation CommentCheckIn($checkinId: ID!, $content: String!) {
    commentCheckIn(checkinId: $checkinId, content: $content) {
      success
      comment {
        id
        content
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

// Profile mutations
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($name: String, $bio: String, $country: String, $interests: [String]) {
    updateProfile(input: { name: $name, bio: $bio, country: $country, interests: $interests }) {
      success
      message
      user {
        id
        name
        bio
        country
        interests
      }
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(input: { currentPassword: $currentPassword, newPassword: $newPassword }) {
      success
      message
    }
  }
`;

export {
  LOGIN_MUTATION,
  REFRESH_TOKEN,
  SIGNUP_MUTATION,
  CHECK_IN_MUTATION,
  CHECK_IN_PLACE_MUTATION,
  CREATE_PLACE_MUTATION,
  REDEEM_REWARD_MUTATION,
  LIKE_CHECKIN_MUTATION,
  COMMENT_CHECKIN_MUTATION,
  UPDATE_PROFILE_MUTATION,
  CHANGE_PASSWORD_MUTATION
};
