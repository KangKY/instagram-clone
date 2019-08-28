import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import PropTypes from "prop-types";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Location from "../Routes/Location";
import PostDetail from "../Routes/PostDetail";
import EditProfile from "../Routes/EditProfile";
import UploadPost from "../Routes/UploadPost";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/location" component={Location} />
        <Route path="/upload" component={UploadPost} />
        <Route path="/p/:post" component={PostDetail} />
        <Route path="/account/edit" component={EditProfile} />
        <Route path="/:username" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;