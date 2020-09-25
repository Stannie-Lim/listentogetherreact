import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

// auth
import user from './auth/reducer';
import { login } from './auth/thunks';

// room
import room from './room/reducer';
import { createRoom, leaveRoom, joinRoom, getRoom } from './room/thunks';

// song 
import queue from './song/reducer';
import { getQueue, addToQueue } from './song/thunks';

// room users
import usersInRoom from './roomUsers/reducer';
import { getRoomUsers, addNewUser, removeUser } from './roomUsers/thunks';

// music player state 
import musicPlayer from './musicPlayer/reducer';
import { getPlayerState, postPlayerState } from './musicPlayer/thunks';

const reducer = combineReducers({
	user,
	room,
	queue,
	usersInRoom,
	musicPlayer,
});


const store = createStore(reducer, applyMiddleware(thunks, createLogger({collapsed: true})));

export default store;

export {
	login,
	createRoom,
	leaveRoom,
	joinRoom,
	getQueue,
	addToQueue,
	getRoomUsers,
	addNewUser,
	removeUser,
	getRoom,
	getPlayerState,
	postPlayerState,

};
