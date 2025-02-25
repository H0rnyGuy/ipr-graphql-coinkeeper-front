import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation session_login($loginData: LoginUserDto!) {
    session_login(loginData: $loginData) {
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Signup($data: CreateUserDto!) {
    signup(data: $data) {
        id
        email
        username
    }
  }
`;
