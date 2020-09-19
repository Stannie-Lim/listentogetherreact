import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosHttpRequest } from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';

// store 
import { joinRoom, login } from '../store/store';

// socket
import { connectToRoom } from '../socket';

const Loading = ({ match }) => {
    const { id } = match.params;

    const room = useSelector( ({ room }) => room);
    const data = useSelector( ({ user }) => user);

    const dispatch = useDispatch();
    useEffect( () => {
        getData();
    }, []);

    const getData = async() => {
        // const { data } = await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`);
        connectToRoom(data);
        dispatch(joinRoom(data.id, id));
        dispatch(login(data));
    }

    return (
        room.id ? <Redirect to={`/room/${id}`} /> : <h1>Loading</h1>
    );
};

export default Loading;