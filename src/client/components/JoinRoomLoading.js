import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// store 
import { joinRoom } from '../store/store';

// socket
import { connectToRoom } from '../socket';

const Loading = ({ match }) => {
    const { id } = match.params;

    const user = useSelector( ({ user }) => user);
    const room = useSelector( ({ room }) => room);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(joinRoom(user.id, id));
        connectToRoom(user);
    }, []);

    return (
        room.id ? <Redirect to={`/room/${id}`} /> : <h1>Loading</h1>
    );
};

export default Loading;