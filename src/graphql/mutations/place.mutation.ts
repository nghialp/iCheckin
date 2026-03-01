import { gql } from '@apollo/client';
import { PLACE_FIELDS } from '../fragments/place.fragment';

/**
 * Place Mutations
 * Contains all mutations related to place functionality
 */

/**
 * Create a new place
 * @param name - Name of the place
 * @param address - Address of the place
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param type - Type/category of the place
 */
export const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlace($name: String!, $address: String!, $latitude: Float!, $longitude: Float!, $type: String!) {
    createPlace(input: { name: $name, address: $address, latitude: $latitude, longitude: $longitude, type: $type }) {
      success
      message
      place {
        ...PlaceFields
      }
    }
  }
  ${PLACE_FIELDS}
`;

/**
 * Update an existing place
 * @param placeId - ID of the place to update
 * @param name - Updated place name
 * @param address - Updated address
 * @param type - Updated place type
 */
export const UPDATE_PLACE_MUTATION = gql`
  mutation UpdatePlace($placeId: ID!, $name: String, $address: String, $type: String) {
    updatePlace(input: { placeId: $placeId, name: $name, address: $address, type: $type }) {
      success
      message
      place {
        ...PlaceFields
      }
    }
  }
  ${PLACE_FIELDS}
`;

/**
 * Delete a place
 * @param placeId - ID of the place to delete
 */
export const DELETE_PLACE_MUTATION = gql`
  mutation DeletePlace($placeId: ID!) {
    deletePlace(placeId: $placeId) {
      success
      message
    }
  }
`;
