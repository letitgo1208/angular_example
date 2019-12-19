import { constant } from 'utils/constants';

export const REGISTER_USER = constant('registrationPage/register_user');

export function registerUser(user) {
    return {
        type: REGISTER_USER,
        payload: { user },
    };
}
