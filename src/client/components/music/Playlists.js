import { API_URL } from '../../secrets';
import React, { useState, useEffect } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';

// components
import PlaylistCard from '../cards/PlaylistCard';

const Playlists = () => {
    const [ playlists, setPlaylists ] = useState([]);
    
    useEffect( () => {
        getPlaylists();
    }, []);
    
    const getPlaylists = async() => {
        const tracks = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me/playlists`)).data.items.map(playlist => { 
            return {
                uri: playlist.tracks.href,  
                img: playlist.images[0].url,
                name: playlist.name
            }
        });
        setPlaylists(tracks);
    };

    return (
        <div className='playlist'> 
            {
                playlists && playlists.map((playlist, index) => <PlaylistCard key={ index } playlist={ playlist } /> )
            }
        </div>
    );
};

export default Playlists;