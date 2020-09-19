import { GET_PLAYER_STATE } from '../constants';

export const _getPlayerState = player => {
    return {
        type: GET_PLAYER_STATE,
        player
    };
};