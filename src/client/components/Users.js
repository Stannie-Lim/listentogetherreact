import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { getRoomUsers, addNewUser } from '../store/store';

// components
import User from './cards/UserCard';

// socket
import socket from '../socket';

const Users = () => {
    const roomId = useSelector( ({ room }) => room.id);
    const users = useSelector( ({ usersInRoom }) => usersInRoom);

    const dispatch = useDispatch();
    useEffect(() => {
        getUsers()
        socket.on('newuser', user => {
            console.log(user, 'hello');
            dispatch(addNewUser(user));
            // console.log(users);
        });
    }, []);

    const getUsers = () => {
        dispatch(getRoomUsers(roomId));
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