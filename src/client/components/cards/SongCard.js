import React from 'react';

const SongCard = ({ song }) => {
    return (
        <div>
            <img src={ song.image } />
            <h1>{ song.name }</h1>
            <h3>{ song.artist }</h3>
        </div>
    );
};

export default SongCard;