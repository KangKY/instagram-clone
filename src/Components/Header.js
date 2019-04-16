import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import useInput from "../Hooks/useInput";
import Input from "../Components/Input";
import { Pet, Compass, HeartEmpty, User } from "./Icons";
import { ME } from "../SharedQueries";
import { useQuery } from "react-apollo-hooks";

const Header = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: ${props => props.theme.boxBorder};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${props => props.theme.blackColor};
  height: 28px;
  margin: 0 16px;
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
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 70%;
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

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);
  //console.log(data);

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Pet />
            <Divider />
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
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.me ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
