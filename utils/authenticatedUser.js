import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { makeSelectAuthenticated } from 'data/app/selectors';

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // If selector is true, wrapper will not redirect
    authenticatedSelector: makeSelectAuthenticated(true),
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated',
});

const locationHelper = locationHelperBuilder({});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || '/',
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    // If selector is true, wrapper will not redirect
    // So if there is no user data, then we show the page
    authenticatedSelector: makeSelectAuthenticated(false),
    // A nice display name for this check
    wrapperDisplayName: 'UserIsNotAuthenticated',
});

// show the authenticated component or another
export const authenticatedOrElse = (Component, FailureComponent) =>
    connectedAuthWrapper({
        authenticatedSelector: makeSelectAuthenticated(true),
        wrapperDisplayName: 'AuthenticatedOrElse',
        FailureComponent,
    })(Component);
