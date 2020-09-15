import React from 'react';

const UserCard = ({ user }) => {
    console.log(user);
    return (
        <div className='usercard'>
            <img src={user.image} />
            <h1>{ user.display_name }</h1>
        </div>
    );
};

export default UserCard;