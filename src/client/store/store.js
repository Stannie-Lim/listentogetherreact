import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

// schools
import SchoolsReducer from './schools/reducer';
import { login } from './schools/thunks';

const reducer = combineReducers({
	user: SchoolsReducer
});


const store = createStore(reducer, applyMiddleware(thunks, createLogger({collapsed: true})));


export default store;

export {
	login,

};
