import { GET_ROOM_USERS, ADD_NEW_USER } from '../constants';

const roomUsersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ROOM_USERS:
            state = action.users;
            break;
        case ADD_NEW_USER:
            state = [...state, action.user];
            break;
    };
    return state;
};

export default roomUsersReducer;