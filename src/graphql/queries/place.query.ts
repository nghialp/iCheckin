import { gql } from '@apollo/client';
import { PLACE_FIELDS } from '../fragments/place.fragment';
import { CHECKIN_FIELDS } from '../fragments/checkin.fragment';

/**
 * Place Queries
 * Contains queries for place-related data
 */

/**
 * Get detailed information about a place
 * @param id - ID of the place
 */
export const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($id: ID!) {
    place(id: $id) {
      id
      name
      type
      address
      coordinates
      thumbnail
      description
      openingHours
    }
    placeCheckins(placeId: $id) {
      ...CheckinFields
    }
  }
  ${CHECKIN_FIELDS}
`;

/**
 * Get full place details
 * @param id - ID of the place
 */
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

/**
 * Get check-ins at a specific place with pagination
 * @param placeId - ID of the place
 * @param limit - Number of check-ins to return
 * @param offset - Offset for pagination
 */
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

/**
 * Search places by query string and optional coordinates
 * @param query - Search query string
 * @param lat - Optional latitude for location-based search
 * @param lng - Optional longitude for location-based search
 */
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
