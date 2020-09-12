import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../utils/axios';
import SpotifyPlayer from 'react-spotify-web-playback';

// store
import { getQueue } from '../../store/store';

const SongPlayer = () => {

    const songs = useSelector( ({ queue }) => queue.map(song => song.spotifyUri));
    useEffect(() => {
        console.log(songs);
    }, [ songs.length ]);

    return (
        <div className='player'>
            <SpotifyPlayer
                token={ getAccessToken() }
                uris={ songs }
                autoPlay={ true }
            />
        </div>  
    );
};

export default SongPlayer;