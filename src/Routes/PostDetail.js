import React from "react";
import { withRouter } from "react-router-dom";
import Post from "../Components/Post";
import Loader from "../Components/Loader";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

export const GET_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
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
          likeCount
          isLiked
        }
        recommentCount
        isLiked
        likeCount   
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const PostDetail = ({ match: { params } }) => {
  const postId = params.post;
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      id: postId
    }
  });

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if(!loading && data && data.seeFullPost) {
    const {
      id,
      user,
      files,
      likeCount,
      isLiked,
      comments,
      createdAt,
      caption,
      location
    } = data.seeFullPost;

    return (
      <Post
        id={id}
        user={user}
        files={files}
        location={location}
        caption={caption}
        likeCount={likeCount}
        isLiked={isLiked}
        comments={comments}
        createdAt={createdAt}
        detail={true}
      />
    );
  }
  return null;
};

export default withRouter(PostDetail);
