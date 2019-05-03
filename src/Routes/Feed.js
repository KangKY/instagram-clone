import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED = gql`
  {
    seeFeed {
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
        createdAt
      }
      likeCount
      isLiked
      commentCount
      recentcomments {
        id
        text
        parent {
          id
        }
        user {
          id
          username
        }
        isLiked
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED);
  console.log(data);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            location={post.location}
            caption={post.caption}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.recentcomments}
            commentCount={post.commentCount}
            createdAt={post.createdAt}
            detail={false}
          />
        ))}
    </Wrapper>
  );
};
