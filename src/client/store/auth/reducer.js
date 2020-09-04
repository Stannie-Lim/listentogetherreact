import { LOGIN } from '../constants';

const Auth = (state = [], action) => {
    switch(action.type) {
        case LOGIN:
            state = action.user;
            break;
    };
    return state;
};

export default Auth;