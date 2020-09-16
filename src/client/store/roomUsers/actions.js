import { GET_ROOM_USERS, ADD_NEW_USER, REMOVE_USER } from '../constants';

export const _getRoomUsers = users => {
    return {
        type: GET_ROOM_USERS,
        users
    };
};

export const _addNewUser = user => {
    return {
        type: ADD_NEW_USER,
        user
    };
};

export const _removeUser = user => {
    return {
        type: REMOVE_USER,
        user
    };
};  