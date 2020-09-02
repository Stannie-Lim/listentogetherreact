import axios from 'axios';
import { _login } from './actions';

export const login = () => {
    return async dispatch => {
        try {
            // axios call here
            const tempdata = 'hello';
            dispatch(_login(tempdata));
        } catch(err) {
            console.log(err);
        }
    };
};