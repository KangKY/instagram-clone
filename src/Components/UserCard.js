import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import BoldText from "./BoldText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ id, username, isFollowing, url, itsMe }) => (
  <Card>
    <EAvatar url={url} size={"md"} />
    <ELink to={`/${username}`}>
      <BoldText text={username} />
    </ELink>
    {!itsMe && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  itsMe: PropTypes.bool.isRequired
};

export default UserCard;