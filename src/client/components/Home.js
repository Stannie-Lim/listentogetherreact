import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoggedIn = (prop) => {
    const user = useSelector( ({ user }) => user);
    console.log(user);
    return (
        <div>
            <h1>{ user.display_name }</h1>
        </div>
    );
};

export default LoggedIn;