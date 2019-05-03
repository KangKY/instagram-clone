import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from "../../Components/Loader";
import BoldText from '../../Components/BoldText';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';


const Wrapper = styled.div`

`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(8rem, 160px));
  grid-auto-rows: 160px;

  
`;

const PostSection = styled(Section)`
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

  @media (max-width:430px) {
    grid-gap: 7px;
  }
`;

const SearchPresenter =  ({ searchTerm, loading, data}) => {

  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <BoldText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if( data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0? (
            <BoldText text={"사용자를 찾지 못했습니다."} />
          ) : (
            data.searchUser.map(user => (
                <UserCard
                  key={user.id}
                  username={user.username}
                  isFollowing={user.isFollowing}
                  url={user.avatar}
                  itsMe={user.itsMe}
                  id={user.id}
                />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0? (
            <BoldText text={"게시물을 찾지 못했습니다."} />
          ) : (
            data.searchPost.map(post => (
                <SquarePost
                  id={post.id}
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
            ))
          )}
        </PostSection>
      </Wrapper>
    )
  }
};


SearchPresenter.propTypes = {
  searchTerm : PropTypes.string, 
  loading : PropTypes.bool
}

export default SearchPresenter;