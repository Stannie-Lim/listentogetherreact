import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { leaveRoom } from '../store/store';

// components
import Users from './Users';
import Queue from './music/Queue';
import Search from './music/Search';
import Playlists from './music/Playlists';
import SongPlayer from './music/SongPlayer';

const Room = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const user = useSelector( ({ user }) => user.id);
    useEffect(() => {
        return () => {
            dispatch(leaveRoom(user));
        };  
    });

    return (
        <div>
            <h1>{ id } </h1>
            <Search />
            <Playlists />
            <SongPlayer />
            <div className='rightside'>
                <Queue />
                <Users />
            </div>
        </div>
    );
};

export default Room;