import { AxiosHttpRequest, getAccessToken } from './utils/axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// store 
import { login } from './store/store';

//components 
import Home from './components/Home';
import Room from './components/Room';
import Login from './components/Login';
import JoinLoading from './components/JoinRoomLoading';
import CreateLoading from './components/CreateRoomLoading';

const App = () => {
	const user = useSelector( ({ user }) => user);

	const [isLoggedIn, setLoggedIn] = useState(false);

	const dispatch = useDispatch();
	useEffect( () => {
		const token = getAccessToken();

		const getData = async() => {
			const { data } = await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`);
			dispatch(login(data));
		}
		getData();

		if(token) setLoggedIn(true);
	}, []);
	
	return (
		<HashRouter>
			{
				isLoggedIn ? 
				<div>
					<Route exact path='/home' component={ Home } />
					<Route exact path='/create' component={ CreateLoading } />
					<Route exact path='/join/:id' component={ JoinLoading } />
					<Route exact path='/room/:id' component={ Room } />
					<Redirect to='/home' />
				</div>
				:
				<div>
					<Route path='/room/:id' component={ JoinLoading } />
					<Route path='/' component={ Login } />
					<Redirect to='/' />
				</div>
			}
		</HashRouter>
	);
};

export default App;