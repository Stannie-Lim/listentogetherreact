import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

// auth
import user from './auth/reducer';
import { login } from './auth/thunks';

// room
import room from './room/reducer';
import { createRoom } from './room/thunks';

const reducer = combineReducers({
	user,
	room
});


const store = createStore(reducer, applyMiddleware(thunks, createLogger({collapsed: true})));


export default store;

export {
	login,
	createRoom
};
