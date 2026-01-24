import { gql } from '@apollo/client';
import { ACCESS_TOKEN_FIELDS, USER_BASIC_FIELDS } from '../fragments/user.fragment';

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      ...ACCESS_TOKEN_FIELDS
      user {
        ...USER_BASIC_FIELDS
      }
    }
  }
  ${ACCESS_TOKEN_FIELDS}    
  ${USER_BASIC_FIELDS}
`;