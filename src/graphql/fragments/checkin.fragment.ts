import { gql } from "@apollo/client";
import { PLACE_FIELDS } from "./place.fragment";
import { USER_BASIC_FIELDS } from "./user.fragment";

export const CHECKIN_FIELDS = gql`
  fragment CHECKIN_FIELDS on Checkin {
    id
    mood
    status
    checkedAt
    place {
      ...PLACE_FIELDS
    }
    user {
      ...USER_BASIC_FIELDS
    }
    comments {
      id
      content
      createdAt
    }
  }
  ${PLACE_FIELDS}
  ${USER_BASIC_FIELDS}
`;