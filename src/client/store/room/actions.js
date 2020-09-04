import { CREATE_ROOM } from '../constants';

export const _createRoom = room => {
    return {
        type: CREATE_ROOM,
        room
    };
};