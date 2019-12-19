/* eslint-disable no-param-reassign, default-case */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import { REGISTER_USER } from 'pages/Registration/actions';
import { LOGIN_USER_SUCCESS, LOGOUT } from './constants';

// The initial state of the App
export const initialState = {
    error: false,
    loading: false,
    authenticated: false,
    currentUser: false,
};

const appReducer = produce((state, { type, payload }) => {
    switch (type) {
        case REGISTER_USER:
        case LOGIN_USER_SUCCESS:
            state.error = false;
            state.loading = false;
            state.authenticated = true;
            state.currentUser = payload.user;
            break;
        case LOGOUT:
            state.error = false;
            state.loading = false;
            state.authenticated = false;
            state.currentUser = false;
            break;
    }
}, initialState);

export default appReducer;
