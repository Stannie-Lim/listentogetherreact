import { GET_QUEUE, ADD_TO_QUEUE } from '../constants';

export const _getQueue = queue => {
    return {
        type: GET_QUEUE,
        queue
    };
};

export const _addToQueue = song => {
    return {
        type: ADD_TO_QUEUE,
        song
    }
};