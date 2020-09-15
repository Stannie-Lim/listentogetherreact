import { GET_ROOM_USERS } from '../constants';

export const _getRoomUsers = users => {
    return {
        type: GET_ROOM_USERS,
        users
    };
};