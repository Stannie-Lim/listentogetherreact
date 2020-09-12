import { GET_QUEUE, ADD_TO_QUEUE } from '../constants';

const queueReducer = (state = [], action) => {
    switch(action.type) {
        case GET_QUEUE:
            state = action.queue;
            break;
        case ADD_TO_QUEUE:
            state = [...state, action.song];
            break;
    };
    return state;
};

export default queueReducer;