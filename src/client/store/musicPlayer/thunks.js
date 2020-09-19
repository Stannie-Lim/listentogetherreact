import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getPlayerState } from './actions';

export const getPlayerState = () => {
    return async dispatch => {
        try {
            const {data} = await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player');
            if(data !== '') {
                dispatch(_getPlayerState(data));
            }
        } catch(err) {
            console.log(err);
        }   
    };
};