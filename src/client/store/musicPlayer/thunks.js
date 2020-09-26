import { API_URL } from '../../secrets';
import { minimumifySong } from '../../utils/song';
import { AxiosHttpRequest } from '../../utils/axios';

// actions
import { _getPlayerState } from './actions';

export const getPlayerState = (id, state) => {
    return async dispatch => {
        try {
            // const { data } = await AxiosHttpRequest('GET', `${API_URL}/room/${id}/playerstate`);
            dispatch(_getPlayerState(state));
        } catch(err) {
            console.log(err);
        }   
    };
};

export const postPlayerState = (id, { context, position, paused, track_window }) => {
    return async dispatch => {
        try {
            const { uri } = context;
            let { current_track, next_tracks, previous_tracks } = track_window;

            current_track = minimumifySong(current_track);
            next_tracks = next_tracks.map(track => minimumifySong(track));
            previous_tracks = previous_tracks.map(track => minimumifySong(track));

            const { data } = await AxiosHttpRequest('POST', `${API_URL}/room/${id}/playerstate`, { context: uri, current_track, next_tracks, previous_tracks, paused, position });
            // dispatch(_getPlayerState(data));
        } catch(err) {
            console.log(err);
        }
    };
};