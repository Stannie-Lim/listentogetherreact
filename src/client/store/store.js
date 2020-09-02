import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

// schools
import SchoolsReducer from './schools/reducer';
import { getSchools } from './schools/thunks';

const reducer = combineReducers({
	schools: SchoolsReducer
});


const store = createStore(reducer, applyMiddleware(thunks, createLogger({collapsed: true})));


export default store;

export {
	getSchools,

};
