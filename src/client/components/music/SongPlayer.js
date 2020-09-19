import React, { useEffect } from 'react';
import { getAccessToken } from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

// store
import { getQueue, getPlayerState } from '../../store/store';

const SongPlayer = () => {

    const songs = useSelector( ({ queue }) => queue.map(song => song.spotifyUri));
    const musicPlayer = useSelector( ({ musicPlayer }) => musicPlayer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlayerState());
        console.log(musicPlayer);
    }, [ songs.length ]);

    return (
        <div className='player'>
            <SpotifyPlayer
                token={ getAccessToken() }
                uris={ songs }
            />
        </div>  
    );
};

export default SongPlayer;