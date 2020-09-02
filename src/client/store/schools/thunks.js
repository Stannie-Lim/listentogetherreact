import axios from 'axios';
import { _login } from './actions';

export const login = (info) => {
    return async dispatch => {
        try {
            dispatch(_login(info));
        } catch(err) {
            console.log(err);
        }
    };
};