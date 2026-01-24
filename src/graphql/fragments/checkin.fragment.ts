import { gql } from "@apollo/client";
import { PLACE_FIELDS } from "./place.fragment";
import { USER_BASIC_FIELDS } from "./user.fragment";

export const CHECKIN_FIELDS = gql`
  fragment CheckinFields on Checkin {
    id
    mood
    status
    checkedAt
    content
    place {
      ...PlaceFields
    }
    user {
      ...UserBasicFields
    }
  }
  ${PLACE_FIELDS}
  ${USER_BASIC_FIELDS}
`;