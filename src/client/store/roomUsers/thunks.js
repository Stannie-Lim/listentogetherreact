import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getRoomUsers } from './actions';

export const getRoomUsers = (id) => {
    return async dispatch => {
        const { data } = await AxiosHttpRequest('GET', `${API_URL}/room/users/${id}`);
        dispatch(_getRoomUsers(data));
    };
};