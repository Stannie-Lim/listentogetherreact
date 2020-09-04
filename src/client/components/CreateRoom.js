import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// store
import { createRoom } from '../store/store';

const CreateRoom = () => {
    const dispatch = useDispatch();

    const create = () => {
        dispatch(createRoom());
    };

    return (
        <button onClick={ () => create() }>Create room</button>        
    );
};

export default CreateRoom;