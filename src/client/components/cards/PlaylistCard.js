import { minimumifySong } from '../../utils/song';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';

// components
import SongCard from './SongCard';

const PlaylistCard = ({ playlist }) => {
    const [ songs, setSongs ] = useState([]);

    useEffect( () => {
        getSongs();
    }, []);

    const getSongs = async() => {
        const { items } = (await AxiosHttpRequest('GET', playlist)).data;
        const allSongs = [];
        for(const song of items) {
            allSongs.push(minimumifySong(song.track));
        }
        setSongs(allSongs);
    };

    return (
        <div>
            {
                songs.map(song => <SongCard key={ song.id } song={ song } /> )
            }
        </div>
    );
};

export default PlaylistCard;