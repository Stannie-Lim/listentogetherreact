import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store 
import { getQueue } from '../../store/store';

// components
import QueueSongCard from '../cards/QueueSongCard';

const Queue = () => {
    const dispatch = useDispatch();
    const queue = useSelector( ({ queue }) => queue);
    const room = useSelector( ({ room }) => room);
    
    useEffect( () => {
        dispatch(getQueue(room.queueId));
    }, [ queue.length ]);

    return (
        <div className='queue'>
            <h1>Queue</h1>
            {
                queue && queue.map(song => <QueueSongCard key={ song.id } song={ song } /> )
            }
        </div>
    );
};

export default Queue;