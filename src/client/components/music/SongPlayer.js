import React, { useEffect, useState } from 'react';
import { getAccessToken, AxiosHttpRequest } from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

// store
import { getQueue, getPlayerState } from '../../store/store';

const SongPlayer = () => {
    const [ device, setDevice ] = useState('');

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
                  getOAuthToken: cb => cb(getAccessToken()),
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
            player.on('player_state_changed', (state) => { 
                dispatch(getPlayerState(state));
            });

            // Ready
            player.on('ready', ({ device_id }) => {
                setDevice(device_id);
            });
        }
    }, [ songs.length ]);

    const play = () => {
        music.togglePlay();

        setInterval(() => getState(), 2000);
    };

    const next = () => {
        music.nextTrack();
    };

    const prev = () => {
        music.previousTrack();
    };

    const getState = async() => {
        const state = await music.getCurrentState();
        
        console.log(state.position, 'saldjaslkdjaslkdsajlkdsakldjsakld');
    };

    return (
        <div className='player'>
            {
                musicPlayer.track_window && 
                <div>
                    <div className='currently-playing'>
                        <img src={ musicPlayer.track_window.current_track.album.images[0].url } />
                        <h1>{ musicPlayer.track_window.current_track.name }</h1>
                    </div>
                    <div className='controls'>
                        <h1 onClick={ () => prev() }>Previous</h1>
                        <h1 onClick={ () => play() }>{ musicPlayer.paused ? 'Play' : 'Pause' }</h1>
                        <h1 onClick={ () => next() }>Next</h1>
                    </div>
                </div>
            }
        </div>  
    );
};

export default SongPlayer;