import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text:String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      parent {
        id
      } 
      recommentCount
      isLiked
      likeCount
      user {
        avatar
        username
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($postId: String!, $text:String!, $commentId:String!) {
    addReply(postId: $postId, text: $text, commentId: $commentId) {
      id
      text
      createdAt
      seq
      user {
        id
        avatar
        username
      }
      isLiked
      likeCount   
    }
  }
`