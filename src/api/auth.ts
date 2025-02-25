import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation session_login($loginData: LoginUserDto!) {
    session_login(loginData: $loginData) {
      accessToken
      refreshToken
    }
  }
`;
