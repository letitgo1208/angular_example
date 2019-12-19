/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import log from 'utils/logger';
import { tokenIsValid, getUser } from 'utils/storage';

import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
    let initializedState = Object.assign({}, initialState);
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [routerMiddleware(history), thunk];

    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle, indent */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
                  // Prevent recomputing reducers for `replaceReducer`
                  shouldHotReload: false,
              })
            : compose;
    /* eslint-enable */

    /*
      Check the users token here
      if the token is valid, perform a view query to populate initialState
    */
    if (tokenIsValid()) {
        let user = {};
        try {
            user = getUser();
        } catch (e) {
            log.error('Unable to retrieve user from storage', e);
        }
        initializedState = Object.assign(
            {},
            {
                global: {
                    authenticated: true,
                    user,
                },
            }
        );
    }

    const store = createStore(
        createReducer(),
        initializedState,
        composeEnhancers(...enhancers)
    );

    // Extensions
    store.injectedReducers = {}; // Reducer registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
