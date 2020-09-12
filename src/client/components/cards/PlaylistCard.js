import { minimumifySong } from '../../utils/song';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';

// components
import SongCard from './SongCard';

const PlaylistCard = ({ playlist }) => {
    const [ songs, setSongs ] = useState([]);
    const [ display, setDisplay ] = useState(false);

    useEffect( () => {
        getSongs();
    }, []);

    const getSongs = async() => {
        const { items } = (await AxiosHttpRequest('GET', playlist.uri)).data;
        const allSongs = [];
        for(const song of items) {
            allSongs.push(minimumifySong(song.track));
        }
        setSongs(allSongs);
    };

    return (
        <div>
            <div className='playlist-info'>
                <h1>{ playlist.name }</h1>
                <img onClick={ () => setDisplay(!display) } src={ playlist.img } />
            </div>
            <div className={ display ? 'playlist-songs' : 'playlist-songs hide' }>
                {
                    songs.map(song => <SongCard key={ song.id } song={ song } /> )
                }
            </div>
        </div>
    );
};

export default PlaylistCard;