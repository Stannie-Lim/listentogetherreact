import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// store
import { leaveRoom } from '../store/store';

// components
import SongPlayer from './music/SongPlayer';
import Search from './music/Search';

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
        <div>
            <h1>{ id } </h1>
            <Search />
            <SongPlayer />
        </div>
    );
};

export default Room;