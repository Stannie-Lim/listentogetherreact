import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL } from '../../secrets';
import { _createRoom } from './actions';

export const createRoom = () => {
    return async dispatch => {
        try {
            // const { data } = await AxiosHttpRequest('POST', 
            dispatch(_createRoom());
        } catch(err) {
            console.log(err);
        }
    };
};