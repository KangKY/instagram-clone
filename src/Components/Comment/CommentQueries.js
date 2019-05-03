import {gql} from 'apollo-boost';

export const TOGGLE_COMMENTLIKE = gql`
  mutation toggleCommentLike($commentId:String!) {
    toggleCommentLike(commentId:$commentId)
  }
`;

export const SEE_COMMENT = gql`
  query seeComment($id: String!) {
    seeComment(id: $id) {
      id
      text
      createdAt
      seq
      parent {
        id
      }  
      user {
        id
        avatar
        username
      }
      recomments {
        id
        text
        createdAt
        user {
          id
          avatar
          username
        }
      }
      recommentCount
      isLiked
      likeCount   
  }
  }
`;