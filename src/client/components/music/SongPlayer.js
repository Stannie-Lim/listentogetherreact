import React from 'react';
import { getAccessToken } from '../../utils/axios';
import SpotifyPlayer from 'react-spotify-web-playback';

const SongPlayer = () => {
    return (
        <div className='player'>
            <SpotifyPlayer
                token={ getAccessToken() }
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
            />
        </div>  
    );
};

export default SongPlayer;