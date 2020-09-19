import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _setRoom } from './actions';

export const createRoom = (id) => {
    return async dispatch => {
        try {
            const { data } = await AxiosHttpRequest('POST', `${API_URL}/room`);
            await AxiosHttpRequest('POST', `${API_URL}/user/join/${data.id}`, { id });
            await AxiosHttpRequest('POST', `${API_URL}/queue/${data.id}`);
            const room = (await AxiosHttpRequest('GET', `${API_URL}/room/${data.id}`)).data;
            dispatch(_setRoom( {...data, queueId: room.queue.id } ));
        } catch(err) {
            console.log(err);
        }
    };
};

export const joinRoom = (id, roomId) => {
    return async dispatch =>{ 
        try {
            await AxiosHttpRequest('POST', `${API_URL}/user/join/${roomId}`, { id });
            const room = (await AxiosHttpRequest('GET', `${API_URL}/room/${roomId}`)).data;
            dispatch(_setRoom( {...room, queueId: room.queue.id } ));
        } catch(err) {
            console.log(err);
        }
    };
};

export const leaveRoom = (user) => {
    return async dispatch => {
        try { 
            await AxiosHttpRequest('POST', `${API_URL}/user/leave`, { id: user.id });
            dispatch(_setRoom(null));
        } catch(err) {
            console.log(err);
        }
    };
};

export const getRoom = (id) => {
    return async dispatch => {
        try {
            const { data } = await AxiosHttpRequest('GET', `${API_URL}/room/${id}`);
            dispatch(_setRoom({ ...data, queueId: data.queueId }));
        } catch(err) {
            console.log(err);
        }
    };
};