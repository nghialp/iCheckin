import { gql } from '@apollo/client';

export const PLACE_FIELDS = gql`
  fragment PlaceFields on Place {
    id
    name
    types
    category
    address
    lat
    lng
    thumbnail
    description
    mapboxId
    photos
  }
`;

export const MAP_PLACE_FIELDS = gql`
  fragment MapPlaceFields on MapPlace {
    name
    types
    address
    lat
    lng
    thumbnail
    mapboxId
    distance
  }
`;