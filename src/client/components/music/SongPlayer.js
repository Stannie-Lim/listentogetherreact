import React, { useEffect, useState } from 'react';
import { getAccessToken, AxiosHttpRequest } from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

// store
import { getQueue, getPlayerState } from '../../store/store';

const SongPlayer = () => {
    const songs = useSelector( ({ queue }) => queue.map(song => song.spotifyUri));
    const musicPlayer = useSelector( ({ musicPlayer }) => musicPlayer);

    const dispatch = useDispatch();

    // TODO: PUT THIS IN REDUX STORE SO YOU CAN ACTUALLY PLAY MUSIC
    const [ music, setMusic ] = useState({});

    useEffect(() => {
        const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);

        const checkForPlayer = () => {
            if (window.Spotify !== null) {
                clearInterval(playerCheckInterval);
                const player = new window.Spotify.Player({
                  name: "Music Player",
                  getOAuthToken: cb => { cb(getAccessToken()); },
                });

                setMusic(player);

                createEventHandlers(player);
                
                // finally, connect!
                player.connect();
            }
        };

        const createEventHandlers = (player) => {
            player.on('initialization_error', e => { console.error(e); });
            player.on('account_error', e => { console.error(e); });
            player.on('playback_error', e => { console.error(e); });
          
            // Playback status updates
            player.on('player_state_changed', state => { 
                console.log(state); 
            });
          
            // Ready
            player.on('ready', ({ device_id }) => {
                console.log(device_id);
            });
        }

        dispatch(getPlayerState());
        console.log(musicPlayer);
    }, [ songs.length ]);

    const play = () => {
        music.togglePlay();
    };

    return (
        <div className='player'>
            {
                <h1 onClick={ () => play() }>Click</h1>
            }
        </div>  
    );
};

export default SongPlayer;