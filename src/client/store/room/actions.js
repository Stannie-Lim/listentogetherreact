import { SET_ROOM } from '../constants';

export const _setRoom = room => {
    return {
        type: SET_ROOM,
        room
    };
};