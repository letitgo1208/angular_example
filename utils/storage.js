import storage from 'store2';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import pick from 'lodash/pick';
import { APP_NAME_SAFE } from 'utils/constants';
import logger from './logger';

export const STORAGE_KEYS = {
    JWT_TOKEN: 'token',
    USER: 'user',
};

const appStore = storage.namespace(`${APP_NAME_SAFE}.storage`);

export function logout() {
    appStore.clearAll();
}

export function getToken() {
    return appStore(STORAGE_KEYS.JWT_TOKEN);
}

export function setToken(token) {
    appStore(STORAGE_KEYS.JWT_TOKEN, token);
}

export function getUser() {
    return appStore(STORAGE_KEYS.USER) || {};
}

export function setUser(user) {
    appStore(
        STORAGE_KEYS.USER,
        pick(user, ['id', 'email', 'first_name', 'last_name'])
    );
}

/**
 * @param {String} token to check. will pull from localstorage if none supplied
 * @returns {Boolean}
 */
export function tokenIsValid(token = false) {
    const tokenToCheck = token || getToken();
    try {
        const { exp } = jwtDecode(tokenToCheck);
        if (!moment().isBefore(moment.unix(exp))) {
            return false;
        }
        logger.debug('token is valid', { token: `Bearer ${tokenToCheck}` });
        return true;
    } catch (err) {
        logger.error('invalid token', err);
    }
    return false;
}
