import { SET_ROOM } from '../constants';

const Room = (state = {}, action) => {
    switch(action.type) {
        case SET_ROOM:
            state = action.room;
            break;
    };
    return state;
};

export default Room;