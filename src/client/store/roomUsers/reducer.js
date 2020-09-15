import { GET_ROOM_USERS } from '../constants';

const roomUsersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ROOM_USERS:
            state = action.users;
            break;
    };
    return state;
};

export default roomUsersReducer;