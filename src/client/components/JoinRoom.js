import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinRoom = () => {
    const [ roomCode, setRoomCode ] = useState('');
    
    return (
        <div>
            <input type='text' onChange={ ({ target }) => setRoomCode(target.value) } value={ roomCode } />
            <Link to={`/join/${ roomCode }`}>Join Room</Link>
        </div>
    );
};

export default JoinRoom;