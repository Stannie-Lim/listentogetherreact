import { GET_ROOM_USERS, ADD_NEW_USER, REMOVE_USER } from '../constants';

const roomUsersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ROOM_USERS:
            state = action.users;
            break;
        case ADD_NEW_USER:
            state = [...state, action.user];
            break;
        case REMOVE_USER:
            state = state.filter(user => user.id !== action.user.id);
            break;
    };
    return state;
};

export default roomUsersReducer;