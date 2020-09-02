import { LOGIN } from '../constants';

export const _login = user => {
    return {
        type: LOGIN,
        user
    };
};