import React, { useState } from 'react';
import { minimumifySong } from '../../utils/song';
import { AxiosHttpRequest } from '../../utils/axios';

// components
import SongCard from '../cards/SongCard';

const Search = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ results, setSearchResults ] = useState([]);

    const search = async() => {
        const songs = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&market=US`)).data.tracks.items.map(song => minimumifySong(song));
        setSearchResults(songs);
    };

    return (
        <div>
            <input type='text' onChange={ ({ target }) => setSearchTerm(target.value) } value={ searchTerm } />
            <button onClick={ search }>Search</button>
            {
                results && results.map(song => <SongCard key={ song.id } song={ song } />)
            }
        </div>
    );
};

export default Search;