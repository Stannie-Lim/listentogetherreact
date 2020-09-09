import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// store
import { leaveRoom } from '../store/store';

// components
import Search from './music/Search';
import SongPlayer from './music/SongPlayer';
import Playlists from './music/Playlists';

const Room = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(leaveRoom(user.id));
        };  
    });

    return (
        <div>
            <h1>{ id } </h1>
            <Search />
            <Playlists />
            <SongPlayer />
        </div>
    );
};

export default Room;