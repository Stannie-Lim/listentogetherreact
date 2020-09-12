import React from 'react';

const QueueSongCard = ({ song }) => {
    return (
        <div className='song-card'>
            <img src={ song.image } />
            <h1>{ song.name }</h1>
            <h3>{ song.artist }</h3>
        </div>
    );
};

export default QueueSongCard;