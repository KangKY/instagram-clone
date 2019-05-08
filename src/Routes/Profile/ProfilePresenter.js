import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import BoldText from "../../Components/BoldText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { Edit } from "../../Components/Icons";
import {Link} from "react-router-dom";


const Wrapper = styled.div`
  min-height: 70vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
  @media (max-width:768px) {
    width:95%;
  }
`;



const HeaderColumn = styled.div`
  flex-grow:${props=>props.grow};
  &:first-child {
    margin-right:20px;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom:20px;
  flex-direction:row;

`;

const Username = styled.span`
  font-size: 28px;
  display: block;
  margin-right:20px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const ButtonWrap = styled.div`
  display:block;
  min-width:50%;
  max-width:180px;
`;

const FullName = styled(BoldText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  /* grid-gap: 25px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 200px;
  grid-auto-rows: 200px; */
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 15px;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        itsMe,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn grow={1}>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn grow={2}>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {itsMe? (<Link to="/account/edit"><Edit /></Link>) : <></>}
            </UsernameRow>
            <ButtonWrap>
                {itsMe ? (
                  <Button onClick={logOut} text="Log Out" />
                ) : (
                  <FollowButton isFollowing={isFollowing} id={id} followersCount={followersCount}/>
                )}
              </ButtonWrap>
            <Counts>
              <Count>
                게시물 <BoldText text={String(postsCount)} />
              </Count>
              <Count>
                팔로워 <BoldText text={String(followersCount)} />
              </Count>
              <Count>
                팔로우 <BoldText text={String(followingCount)} />
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                id={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
                detail={true}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};