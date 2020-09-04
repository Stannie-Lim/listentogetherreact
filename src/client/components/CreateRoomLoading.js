import io from 'socket.io-client';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// store
import { createRoom } from '../store/store';

import "../socket";

const Loading = () => {
    const dispatch = useDispatch();

    const id = useSelector( ({ user }) => user.id);
    const room = useSelector( ({ room }) => room);
    
    useEffect( () => {
        dispatch(createRoom(id));
    }, []);

    return (
        room.id ? <Redirect to={`/room/${room.id}`} /> : <h1>Loading</h1>
    );
};

export default Loading;