import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getPlayerState } from './actions';

export const getPlayerState = (state) => {
    return async dispatch => {
        try {
            console.log(state);
            dispatch(_getPlayerState(state));
        } catch(err) {
            console.log(err);
        }   
    };
};