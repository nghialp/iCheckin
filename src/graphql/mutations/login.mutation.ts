import { gql } from '@apollo/client';
import { ACCESS_TOKEN_FIELDS, USER_BASIC_FIELDS } from '../fragments/user.fragment';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...ACCESS_TOKEN_FIELDS
      user {
        ...USER_BASIC_FIELDS
      }
    }
  }
  ${ACCESS_TOKEN_FIELDS}    
  ${USER_BASIC_FIELDS}

`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...ACCESS_TOKEN_FIELDS
    }
  }
    ${ACCESS_TOKEN_FIELDS}
`;