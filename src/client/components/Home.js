import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const LoggedIn = (prop) => {
    const user = useSelector( ({ user }) => user);
    console.log(user);
    return (
        <div>
            <h1>{ user.display_name }</h1>
            <CreateRoom />
            <JoinRoom />
        </div>
    );
};

export default LoggedIn;