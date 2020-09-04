import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createRoom } from '../store/store';

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