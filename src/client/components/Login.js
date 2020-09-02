import qs from 'qs';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import React, { useState, useEffect } from 'react';
import { setJwt, AxiosHttpRequest } from '../utils/axios';

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

    useEffect( () =>{
        const token = qs.parse(location.pathname);
        const access_token = token['/access_token'];
        if(access_token) {
            spotifyApi.setAccessToken(access_token);
            setJwt(access_token);
            getData();
            setAccess(true);
        }
    }, [ location.pathname ]);

    return (
        <div>
            <a href='http://localhost:3000/api/auth' > Login to Spotify </a>
            {
                hasAccess ? <Redirect to='/home' /> : ''
            }
        </div>
    ); 
};

export default Login;