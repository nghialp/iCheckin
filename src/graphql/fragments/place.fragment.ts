import { gql } from '@apollo/client';

/**
 * PLACE_FIELDS Fragment
 * Standard place information used in place queries and lists
 */
export const PLACE_FIELDS = gql`
  fragment PLACE_FIELDS on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    rating
  }
`;

/**
 * MAP_PLACE_FIELDS Fragment
 * Place information optimized for map display
 * Used in nearbyPlaces queries and map-related features
 */
export const MAP_PLACE_FIELDS = gql`
  fragment MAP_PLACE_FIELDS on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    rating
  }
`;

/**
 * PLACE_DETAIL_FIELDS Fragment
 * Detailed place information for detail pages
 */
export const PLACE_DETAIL_FIELDS = gql`
  fragment PLACE_DETAIL_FIELDS on Place {
    id
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    rating
  }
`;

/**
 * PLACE_WITH_CHECKINS_FIELDS Fragment
 * Place data combined with check-in information
 */
export const PLACE_WITH_CHECKINS_FIELDS = gql`
  fragment PLACE_WITH_CHECKINS_FIELDS on Place {
    ...PLACE_FIELDS
    totalCheckIns
    rating
  }
  ${PLACE_FIELDS}
`;

/**
 * SEARCH_PLACE_FIELDS Fragment
 * Search result place information - used for nearbyPlaces and searchPlaces
 * Note: SearchPlace is a different type from Place in the GraphQL schema
 */
export const SEARCH_PLACE_FIELDS = gql`
  fragment SEARCH_PLACE_FIELDS on SearchPlace {
    mapboxId
    name
    rating
    address
    types
    lat
    lng
    thumbnail
    distance
  }
`;