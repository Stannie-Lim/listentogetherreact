import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL } from '../../secrets';
import { _setRoom } from './actions';

export const createRoom = (id) => {
    return async dispatch => {
        try {
            const { data } = await AxiosHttpRequest('POST', `${API_URL}/room`);
            await AxiosHttpRequest('POST', `${API_URL}/user/join/${data.id}`, { id });
            dispatch(_setRoom(data));
        } catch(err) {
            console.log(err);
        }
    };
};

export const joinRoom = (id, roomId) => {
    return async dispatch =>{ 
        try {
            const { data } = await AxiosHttpRequest('POST', `${API_URL}/user/join/${roomId}`, { id });
            console.log(data);
            dispatch(_setRoom(data));
        } catch(err) {
            console.log(err);
        }
    };
};

export const leaveRoom = (id) => {
    return async dispatch => {
        try { 
            const { data } = await AxiosHttpRequest('POST', `${API_URL}/user/leave`, { id });
            // dispatch(_setRoom(data));
        } catch(err) {
            console.log(err);
        }
    };
};