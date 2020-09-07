import React from 'react';
import { getAccessToken } from '../../utils/axios';
import SpotifyPlayer from 'react-spotify-web-playback';

const SongPlayer = () => {
    return (
        <SpotifyPlayer
            token={ getAccessToken() }
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        />
    );
};

export default SongPlayer;