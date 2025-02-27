import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation session_login($loginData: LoginUserDto!) {
    session_login(loginData: $loginData) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT_MUTATION = gql`
    mutation session_logout {
      session_logout {
        success
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

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($data: VerificationTokenDto!) {
    verifyEmail(data: $data) {
        user {
            id
            email
            username
            isVerified
        }
        session {
              accessToken
              refreshToken
        }
    }
  }
`;

export const RESET_PASSWORD = gql`
    mutation confirmPassword($data: PasswordVerificationDto!) {
      confirmPassword(data: $data) {
        success
      }
    }
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
    mutation resetPassword($data: ResendEmailVerificationDto!) {
        resetPassword(data: $data) {
            success
        }
    }
`;