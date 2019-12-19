/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import globalReducer from 'data/app/reducer';
import homeReducer from 'pages/Home/homeReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        global: globalReducer,
        home: homeReducer,
        ...injectedReducers,
    });
}
