import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { leaveRoom, getPlayerState } from '../store/store';

// components
import Users from './Users';
import Queue from './music/Queue';
import Search from './music/Search';
import Playlists from './music/Playlists';
import SongPlayer from './music/SongPlayer';

const Room = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const user = useSelector( ({ user }) => user);

    const userLeaveRoom = () => {
        dispatch(leaveRoom(user));
    };

    return (
        <div>
            <Link to='/home' onClick={ () => userLeaveRoom() }>Leave Room</Link>
            <h1>{ id } </h1>
            <Search />
            <Playlists />
            <SongPlayer />
            <div className='rightside'>
                <Queue id={ id } />
                <Users id={ id } />
            </div>
        </div>
    );
};

export default Room;