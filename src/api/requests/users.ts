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

export const UPDATE_PROFILE = gql`
    mutation updateMe ($data: UpdateUserDto!)  {
      updateMe (data: $data) {
        id
        email
        username
        firstName
        lastName
      }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation changePassword($data: ChangeUserPasswordDto!) {
      changePassword(data: $data) {
        success
      }
    }
`;

