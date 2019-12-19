import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Home from 'pages/Home/Loadable';
import Flows from 'pages/Flows/Loadable';
import People from 'pages/People/Loadable';
import Forms from 'pages/Forms/Loadable';
import Settings from 'pages/Settings/Loadable';
import Registration from 'pages/Registration/Loadable';
import Login from 'pages/Login/Loadable';
import NotFound from 'pages/NotFound/Loadable';

import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from 'utils/authenticatedUser';

const Routes = () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/calendar" />} />
        <Route exact path="/calendar" component={userIsAuthenticated(Home)} />
        <Route exact path="/calendar/*" component={userIsAuthenticated(Home)} />
        <Route path="/flows" component={userIsAuthenticated(Flows)} />
        <Route exact path="/people" component={userIsAuthenticated(People)} />
        <Route
            exact
            path="/settings"
            component={userIsAuthenticated(Settings)}
        />
        <Route path="/forms" component={userIsAuthenticated(Forms)} />
        {/* NON AUTHED ROUTES BELOW */}
        <Route
            exact
            path="/register"
            component={userIsNotAuthenticated(Registration)}
        />
        <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
        <Route path="" component={NotFound} />
    </Switch>
);

export default withRouter(Routes);
