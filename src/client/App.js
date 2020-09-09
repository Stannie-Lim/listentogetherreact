import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { removeTokens } from './utils/axios';

//components 
import Home from './components/Home';
import Room from './components/Room';
import Login from './components/Login';
import JoinLoading from './components/JoinRoomLoading';
import CreateLoading from './components/CreateRoomLoading';

const App = () => {
	const user = useSelector( ({ user }) => user);

	return (
		<HashRouter>
			{
				user.id ? 
				<div>
					<Route exact path='/home' component={ Home } />
					<Route exact path='/create' component={ CreateLoading } />
					<Route exact path='/join/:id' component={ JoinLoading } />
					<Route exact path='/room/:id' component={ Room } />
				</div>
				:
				<div>
					<Route path='/' component={ Login } />
					<Redirect to='/' />
				</div>
			}
			{/* <Route exact path='/home' component={ Home } /> */}
		</HashRouter>
	);
};

export default App;