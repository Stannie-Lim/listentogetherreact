import qs from 'qs';
import { setJwt, AxiosHttpRequest } from '../utils/axios';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
    
const Login = ({ location }) => {
    const [ hasAccess, setAccess ] = useState(false);
    useEffect( () =>{
        const token = qs.parse(location.pathname);
        const access_token = token['/access_token'];
        if(access_token) {
            spotifyApi.setAccessToken(access_token);
            setJwt(access_token);
            const getData = async() => {
                const { data } = await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`);
                console.log(data);
            };
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