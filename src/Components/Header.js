import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import useInput from "../Hooks/useInput";
import Input from "../Components/Input";
import { Pet, Compass, User, Map, Upload } from "./Icons";
import { ME } from "../SharedQueries";
import { useQuery } from "react-apollo-hooks";

const Header = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: ${props => props.theme.boxBorder};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 10px;
  position: fixed;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 15px 10px;
  }

  @media  (max-width: 450px) {
    padding: 10px 10px;
  }
`;

const MediaWrap = styled.span`
  display:flex;
  @media (max-width: 650px) {
    display: none;
  }
`

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${props => props.theme.blackColor};
  height: 28px;
  margin: 0 16px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;

  &:first-child {
    margin-right: auto;
    text-align: left;
    a {
      display: flex;
    }
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }

  @media  (max-width: 450px) {
    width: 50%;
    &:nth-child(2) {
      display:none;
    }
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
  @media (max-width: 650px) {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 75%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const Title = styled.div`
  font-size: 22px;
  color: ${props => props.theme.blackColor};
  text-transform: uppercase;
  font-weight: 700;
  vertical-align: center;
`;

// withRouter : Router의 기능을 갖지 않는 컴포넌트에게
// Router 기능을 제공
export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);
  //console.log(data);

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
    search.setValue("");
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <MediaWrap>
              <Pet />
              <Divider />
            </MediaWrap>
            <Title>2nd Family</Title>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="검색"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/location">
            <Map />
          </HeaderLink>
          {/* <HeaderLink to="/upload">
            <Upload />
          </HeaderLink>  */}
          {!data.me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={`/${data.me.username}`}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
