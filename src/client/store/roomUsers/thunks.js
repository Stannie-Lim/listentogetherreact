import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getRoomUsers, _addNewUser } from './actions';

export const getRoomUsers = (id) => {
    return async dispatch => {
        const { data } = await AxiosHttpRequest('GET', `${API_URL}/room/users/${id}`);
        dispatch(_getRoomUsers(data));
    };
};

export const addNewUser = user => {
    return async dispatch => {
        dispatch(_addNewUser(user));
    };
};