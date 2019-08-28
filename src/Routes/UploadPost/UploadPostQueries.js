import {gql} from 'apollo-boost';

export const ME = gql`
  query me {
    me {
      id
      username
      avatar
      firstName
      lastName
      bio
      email
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editUser(
    $username:String!
    $firstName:String!
    $lastName:String!
    $bio:String!
    $email:String!) {
      editUser(
        username:$username
        firstName:$firstName
        lastName:$lastName
        bio:$bio
        email:$email
      ) {
        username
        firstName
        lastName
        bio
        email
      }
    }
`;