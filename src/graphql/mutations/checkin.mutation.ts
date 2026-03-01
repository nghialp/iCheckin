import { gql } from '@apollo/client';
import { CHECKIN_FIELDS } from '../fragments/checkin.fragment';

/**
 * Check-in Mutations
 * Contains all mutations related to check-in functionality
 */

/**
 * Create a check-in at a place
 * @param placeId - ID of the place to check-in
 * @param content - Optional content/caption for the check-in
 * @param media - Optional array of media URLs to attach
 */
export const CHECK_IN_PLACE_MUTATION = gql`
  mutation CheckInPlace($placeId: ID!, $content: String, $media: [String]) {
    myCheckinForPlace(input: { placeId: $placeId, content: $content, media: $media }) {
      checkin {
        ...CheckinFields
      }
    }
  }
  ${CHECKIN_FIELDS}
`;

/**
 * Create a check-in with coordinates
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param timestamp - Timestamp of check-in
 * @param content - Optional content/caption
 */
export const CHECK_IN_MUTATION = gql`
  mutation CheckIn($latitude: Float!, $longitude: Float!, $timestamp: String!, $content: String) {
    checkIn(input: { latitude: $latitude, longitude: $longitude, timestamp: $timestamp, content: $content }) {
      ...CheckinFields
    }
  }
  ${CHECKIN_FIELDS}
`;

/**
 * Update an existing check-in
 * @param checkinId - ID of the check-in to update
 * @param content - New content for the check-in
 */
export const UPDATE_CHECKIN_MUTATION = gql`
  mutation UpdateCheckin($checkinId: ID!, $content: String!) {
    updateCheckin(input: { checkinId: $checkinId, content: $content }) {
      success
      message
      checkin {
        ...CheckinFields
      }
    }
  }
  ${CHECKIN_FIELDS}
`;

/**
 * Delete a check-in
 * @param checkinId - ID of the check-in to delete
 */
export const DELETE_CHECKIN_MUTATION = gql`
  mutation DeleteCheckin($checkinId: ID!) {
    deleteCheckin(checkinId: $checkinId) {
      success
      message
    }
  }
`;
