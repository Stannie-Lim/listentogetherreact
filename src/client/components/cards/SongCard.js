import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import { addToQueue } from '../../store/store';

const SongCard = ({ song }) => {
    const dispatch = useDispatch();
    const room = useSelector( ({ room }) => room);

    const enqueue = () => {
        dispatch(addToQueue(song, room.queueId));
    };

    return (
        <div className='song-card' onClick={ enqueue }>
            <img src={ song.image } />
            <h1>{ song.name }</h1>
            <h3>{ song.artist }</h3>
        </div>
    );
};

export default SongCard;