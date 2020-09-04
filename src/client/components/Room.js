import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// store
import { leaveRoom } from '../store/store';

const Room = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            alert('hello');
            dispatch(leaveRoom(user.id));
        };
    });

    return (
        <h1>{ id } </h1>
    );
};

export default Room;