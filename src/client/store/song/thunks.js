import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getQueue, _addToQueue } from './actions';

export const getQueue = (id) => {
    return async dispatch => {
        const { data } = await AxiosHttpRequest('GET', `${API_URL}/queue/${id}`);
        dispatch(_getQueue(data.songs));
    };
};

export const addToQueue = (song, queueId) => {
    return async dispatch => {
        const { data } = await AxiosHttpRequest('POST', `${API_URL}/song`, { name: song.name, artist: song.artist, spotifyUri: song.uri, image: song.image })
        await AxiosHttpRequest('POST', `${API_URL}/song/addtoqueue/${data.id}`, { queueId });
        dispatch(_addToQueue(data));
    };
};