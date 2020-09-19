import { GET_PLAYER_STATE } from '../constants';

const musicPlayer = (state = {}, action) => {
    switch(action.type) {
        case GET_PLAYER_STATE:
            state = action.player;
            break;
    };
    return state;
};

export default musicPlayer;