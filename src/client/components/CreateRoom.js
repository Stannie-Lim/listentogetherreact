import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CreateRoom = () => {
    return (
        <Link to='/create'>Create Room</Link>
    );
};

export default CreateRoom;