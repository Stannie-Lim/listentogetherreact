import qs from 'qs';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import React, { useState, useEffect } from 'react';
import { getAccessToken, setAccessToken, setRefreshToken, AxiosHttpRequest } from '../utils/axios';

const spotifyApi = new SpotifyWebApi();

// store 
import { login } from '../store/store';
    
const Login = ({ location }) => {
    const dispatch = useDispatch();

    const [ hasAccess, setAccess ] = useState(false);

    const getData = async() => {
        const { data } = await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`);
        dispatch(login(data));
    };

    const checkIfLoggedIn = () => {
        return !!getAccessToken();
    };

    const loginThroughSpotify = () => {
        const token = qs.parse(location.pathname);
        const access_token = token['/access_token'];
        const refresh_token = token.refresh_token;
        if(access_token) {
            spotifyApi.setAccessToken(access_token);
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            return true;
        }
        return false;
    };

    useEffect( () =>{
        const isLoggedIn = checkIfLoggedIn() || loginThroughSpotify();
        if(isLoggedIn) {
            getData();
            setAccess(true);
        }
    }, [ location.pathname ]);

    return (
        <div>
            {
                hasAccess ? <Redirect to='/home' /> : <h1>Please log in</h1>
            }
            <a href='http://localhost:3000/api/auth'> Login to Spotify </a>
        </div>
    ); 
};

export default Login;