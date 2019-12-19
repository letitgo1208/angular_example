import debug from 'debug';

import { APP_NAME_SAFE } from 'utils/constants';

const namespace = APP_NAME_SAFE;

const log = {
    log: newLogger('log'),
    info: newLogger('info'),
    // This should be connected to track JS AND our redux store - for global user facing errors
    error: newLogger('error'),
    debug: newLogger('debug'),
};

export function newLogger(where) {
    return debug(`${namespace}:${where}`);
}

export function startDebugging() {
    localStorage.setItem('debug', `${namespace}:*`);
}

export default log;
