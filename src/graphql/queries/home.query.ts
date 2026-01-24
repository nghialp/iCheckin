import { gql } from "@apollo/client";
import { MAP_PLACE_FIELDS } from "../fragments/place.fragment";
import { CHECKIN_FIELDS } from "../fragments/checkin.fragment";

export const GET_HOME_DATA = gql`
  query GetHomeData($lat: Float!, $lng: Float!) {
    nearbyPlaces(lat: $lat, lng: $lng) {
      ...MAP_PLACE_FIELDS
    }
    myCheckins {
      ...CHECKIN_FIELDS
    }
  }
  ${MAP_PLACE_FIELDS}
	${CHECKIN_FIELDS}
`;