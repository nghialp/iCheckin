import { gql } from "@apollo/client";
import { MAP_PLACE_FIELDS } from "../fragments/place.fragment";
import { CHECKIN_FIELDS } from "../fragments/checkin.fragment";

export const GET_NEARBY_PLACES = gql`
  query GetNearbyPlaces($lat: Float!, $lng: Float!, $radius: Float) {
    nearbyPlaces(lat: $lat, lng: $lng, radius: $radius) {
        ...MAP_PLACE_FIELDS
    }
  }
    ${MAP_PLACE_FIELDS}
`;

// Get check-in locations feed
export const GET_CHECKIN_FEED = gql`
  query GetCheckInFeed($mapboxId: String, $page: Int, $limit: Int) {
    placeCheckins(mapboxId: $mapboxId, page: $page, limit: $limit) {
      ...CheckinFields
    }
    ${CHECKIN_FIELDS}
  }
`;