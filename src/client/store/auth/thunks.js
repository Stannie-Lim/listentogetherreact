import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL } from '../../secrets';
import { _login } from './actions';

export const login = (info) => {
    return async dispatch => {
        try {
            await AxiosHttpRequest('POST', `${API_URL}/user`, { id: info.id });
            dispatch(_login(info));
        } catch(err) {
            console.log(err);
        }
    };
};