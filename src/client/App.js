import React, { useState, useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// store
import { getSchools } from './store/store';

//components 
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
	
	useEffect( () => {
		
	});

	return (
		<HashRouter>
			<Route path='/' component={ Login } />
			<Route exact path='/home' component={ Home } />
		</HashRouter>
	);
};

export default App;