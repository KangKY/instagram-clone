import React from "react";
import { withRouter } from "react-router-dom";
import { GET_USER, LOG_OUT } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";

const ProfileContainer = ({ match: { params } }) => {
  const username = params.username;
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      username
    }
  });

  const logOut = useMutation(LOG_OUT);
  return <ProfilePresenter loading={loading} logOut={logOut} data={data}/>;
};

export default withRouter(ProfileContainer);
