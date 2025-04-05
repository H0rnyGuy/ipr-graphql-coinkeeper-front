import {gql} from "@apollo/client";

export const GET_PROFILE = gql`
    query getMe {
      getMe {
        id
        email
        username
        firstName
        lastName
      }
    }
`;
