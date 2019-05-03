import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ id, isFollowing }) => {
  const options = {
    variables: {
      id
    }
  };

  const [isFollowingState, setIsFollowing] = useState(isFollowing);
  const followMutaion = useMutation(FOLLOW, options);
  const unfollowMutaion = useMutation(UNFOLLOW, options);

  const onClick = () => {
    if (isFollowingState === true) {
      setIsFollowing(false);
      unfollowMutaion();
    } else {
      setIsFollowing(true);
      followMutaion();
    }
  };

  return <FollowButtonPresenter isFollowing={isFollowingState} onClick={onClick} />;

};

FollowButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default FollowButtonContainer;
