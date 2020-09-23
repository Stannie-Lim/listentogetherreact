import React from 'react';
import { useSelector } from 'react-redux';
import { minimumifySong } from '../../utils/song';

const QueueSongCard = ({ song }) => {
    const currentSong = useSelector( ({ musicPlayer }) => musicPlayer.track_window ? minimumifySong(musicPlayer.track_window.current_track) : []);
    return (
        <div className={currentSong.id === song.id ? 'current-song song-card' : 'song-card'}>
            <img src={ song.image } />
            <h1>{ song.name }</h1>
            <h3>{ song.artist }</h3>
        </div>
    );
};

export default QueueSongCard;