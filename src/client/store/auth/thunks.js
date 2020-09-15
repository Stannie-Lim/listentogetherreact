import { AxiosHttpRequest } from '../../utils/axios';
import { API_URL } from '../../secrets';
import { _login } from './actions';

export const login = ({ id, display_name, email, images, uri }) => {
    return async dispatch => {
        try {
            const { data } = (await AxiosHttpRequest('POST', `${API_URL}/user`, { id, display_name, email, image: images[0].url, uri }));
            dispatch(_login(data));
        } catch(err) {
            console.log(err);
        }
    };
};