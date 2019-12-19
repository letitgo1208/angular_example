/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const selectRoute = state => state.route;

const makeSelectLoading = () =>
    createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectAuthenticated = authenticated =>
    createSelector(
        selectGlobal,
        globalState =>
            authenticated
                ? globalState.authenticated
                : !globalState.authenticated
    );

const makeSelectLocation = () =>
    createSelector(selectRoute, routeState =>
        Object.assign({}, routeState.location)
    );

export {
    selectGlobal,
    makeSelectLoading,
    makeSelectAuthenticated,
    makeSelectLocation,
};
