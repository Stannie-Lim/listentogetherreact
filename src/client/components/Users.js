import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { getRoomUsers } from '../store/store';

// components
import User from './cards/UserCard';

const Users = () => {
    const roomId = useSelector( ({ room }) => room.id);
    const users = useSelector( ({ usersInRoom }) => usersInRoom);
    console.log(users);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRoomUsers(roomId));
    }, []);

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