import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// store 
import { joinRoom } from '../store/store';

const Loading = ({ match }) => {
    const { id } = match.params;

    const userId = useSelector( ({ user }) => user.id);
    const room = useSelector( ({ room }) => room);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(joinRoom(userId, id));
    }, []);

    return (
        room.id ? <Redirect to={`/room/${id}`} /> : <h1>Loading</h1>
    );
};

export default Loading;