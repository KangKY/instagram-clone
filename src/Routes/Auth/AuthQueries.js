import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const CONFIRM_SECRET = gql`
    mutation confirmSecret(
        $email: String!
        $secret: String!
    ) {
        confirmSecret(
            email: $email
            secret: $secret
        )
    }
`;

export const LOCAL_LOG_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token :$token) @client
    }
`;

