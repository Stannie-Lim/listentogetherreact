import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { minimumifySong } from '../../utils/song';

// store 
import { getQueue, getRoom } from '../../store/store';

// components
import QueueSongCard from '../cards/QueueSongCard';

const Queue = ({ id }) => {
    const dispatch = useDispatch();
    const queue = useSelector( ({ musicPlayer }) => musicPlayer.track_window ? [...musicPlayer.track_window.previous_tracks, musicPlayer.track_window.current_track, ...musicPlayer.track_window.next_tracks] : [] ).map(song => minimumifySong(song));
    const room = useSelector( ({ room }) => room);
    const user = useSelector( ({ user }) => user);
    
    useEffect( () => {
        if(room.id) {
            dispatch(getQueue(room.queueId));
        } else {
            dispatch(getRoom(user.roomId));
        }
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