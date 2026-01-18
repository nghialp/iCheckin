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
      distance
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
      mapboxId
      name
      rating
      address
      types
      lat
      lng
      thumbnail
    }
  }
`;

// Get nearby places query
export const GET_NEARBY_PLACES = gql`
  query GetNearbyPlaces($lat: Float!, $lng: Float!, $radius: Float) {
    nearbyPlaces(lat: $lat, lng: $lng, radius: $radius) {
      mapboxId
      name
      types
      address
      thumbnail
      lat
      lng
      distance
    }
  }
`;

// Get check-in locations feed
export const GET_CHECKIN_FEED = gql`
  query GetCheckInFeed($limit: Int, $limit: Int) {
    placeCheckins(mapboxId: $mapboxId, limit: $limit, limit: $limit) {
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

// Get place detail for CheckInDetail screen
export const GET_PLACE_DETAIL_FULL = gql`
  query GetPlaceDetail($id: ID!) {
    place(id: $id) {
      id
      name
      type
      address
      city
      image
      rating
      hours
      isOpenNow
      description
      lat
      lng
      distance
      totalCheckIns
    }
  }
`;

// Get check-ins at a specific place
export const GET_PLACE_CHECKINS = gql`
  query GetPlaceCheckIns($placeId: ID!, $limit: Int, $offset: Int) {
    placeCheckIns(placeId: $placeId, limit: $limit, offset: $offset) {
      id
      user {
        id
        name
        avatar
      }
      content
      emotion
      images
      createdAt
      likes
      comments
      liked
      timeAgo
    }
  }
`;

// Get user rewards and points
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

// Get reward detail
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

// Get redeem history
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
      qrCode
      expiresAt
      usedAt
    }
  }
`;