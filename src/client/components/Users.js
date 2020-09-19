import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { getRoomUsers, addNewUser, removeUser } from '../store/store';

// components
import User from './cards/UserCard';

// socket
import socket from '../socket';

const Users = ({ id }) => {
    const users = useSelector( ({ usersInRoom }) => usersInRoom);

    const dispatch = useDispatch();
    useEffect(() => {
        getUsers()

        socket.on('newuser', ({ user, roomId }) => {
            dispatch(addNewUser(user));
        });

        socket.on('disconnect', user => {
            dispatch(removeUser(user));
        });

    }, []);

    const getUsers = () => {
        dispatch(getRoomUsers(id));
    };

    return (
        <div className='users'>
            <h1>Users</h1>
            {
                users && users.map(user => <User key={ user.id } user={ user } /> )
            }
        </div>
    );
};

export default Users;