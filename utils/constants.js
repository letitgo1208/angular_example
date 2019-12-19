export const NODE_ENV = process.env.NODE_ENV;
export const API_LOCATION = process.env.API_LOCATION;
export const APP_NAME = process.env.APP_NAME || 'Lungo';
export const APP_NAME_SAFE = APP_NAME.replace(
    /[^0-9a-zA-Z]/g,
    ''
).toLowerCase();
export const constant = ns => `${APP_NAME_SAFE}/${ns.toUpperCase()}`;
export const ROOT_ID = 'app';
