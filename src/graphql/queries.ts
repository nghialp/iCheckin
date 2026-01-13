import { gql } from "@apollo/client";

// Home page data query
export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      mapboxId
      name
      types
      address
      thumbnail
      lat
      lng
    }
    myCheckins {
      id
      place {
        id
        mapboxId
        name
        thumbnail
      }
      checkedAt
      status
      mood
    }
  }
`;

// Place detail query
export const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($placeId: ID!) {
    place(id: $placeId) {
      id
      name
      type
      address
      coordinates
      thumbnail
      description
      openingHours
    }
    placeCheckins(placeId: $placeId) {
      id
      checkedAt
      content
      user {
        id
        name
        avatarUrl
      }
    }
  }
`;

// Search places query
export const SEARCH_PLACES = gql`
  query SearchPlaces($query: String!, $lat: Float, $lng: Float) {
    searchPlaces(query: $query, lat: $lat, lng: $lng) {
      id
      name
      type
      address
      coordinates
      thumbnail
    }
  }
`;

// Get nearby places query
export const GET_NEARBY_PLACES = gql`
  query GetNearbyPlaces($lat: Float!, $lng: Float!, $radius: Float) {
    nearbyPlaces(lat: $lat, lng: $lng, radius: $radius) {
      id
      name
      type
      address
      coordinates
      thumbnail
    }
  }
`;

// Get check-in locations feed
export const GET_CHECKIN_FEED = gql`
  query GetCheckInFeed($limit: Int, $offset: Int) {
    checkInFeed(limit: $limit, offset: $offset) {
      id
      caption
      photos
      feelings
      likes
      createdAt
      user {
        id
        name
        avatar
      }
      place {
        id
        name
        category
        location {
          lat
          lng
        }
      }
      comments {
        id
        content
        createdAt
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

// Get rewards page data
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

// Get user profile
export const GET_PROFILE = gql`
  query GetProfile {
    me {
      id
      name
      email
      avatarUrl
      bio
      country
      interests
    }
  }
`;

// Get user stats
export const GET_USER_STATS = gql`
  query GetUserStats {
    me {
      id
      name
      rewardPoints
      totalCheckins
      totalBadges
      visitedPlaces
    }
  }
`;

// Get my friends
export const GET_MY_FRIENDS = gql`
  query GetMyFriends {
    myFriends {
      id
      name
      avatar
      bio
      country
    }
  }
`;

// Get my followings
export const GET_MY_FOLLOWINGS = gql`
  query GetMyFollowings {
    myFollowings {
      id
      name
      avatar
      bio
      country
    }
  }
`;

