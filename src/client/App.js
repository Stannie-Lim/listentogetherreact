import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// store
import { getSchools } from './store/store';

//components 
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
	const user = useSelector( ({ user }) => user);
	useEffect( () => {
		
	});

	return (
		<HashRouter>
			{
				user.id ? <Route exact path='/home' component={ Home } /> : 
				<div>
					<Route path='/' component={ Login } />
					<Redirect to='/' />
				</div>
			}
		</HashRouter>
	);
};

export default App;