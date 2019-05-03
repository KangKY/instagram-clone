import {gql} from 'apollo-boost';

export const GET_USER = gql`
  query seeUser($username:String!) {
    seeUser(username:$username) {
      id
      username
      avatar
      fullName
      isFollowing
      bio
      itsMe
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;