import React, { useEffect, useState } from 'react';
import { getAccessToken, AxiosHttpRequest } from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

// store
import { getQueue, getPlayerState } from '../../store/store';

const SongPlayer = () => {
    const [ device, setDevice ] = useState('');
    const [ currentPlaying, setCurrentPlaying ] = useState({});
    const [ paused, setPaused ] = useState(true);

    const songs = useSelector( ({ queue }) => queue.map(song => song.spotifyUri));
    const musicPlayer = useSelector( ({ musicPlayer }) => musicPlayer);

    const dispatch = useDispatch();

    // TODO: PUT THIS IN REDUX STORE SO YOU CAN ACTUALLY PLAY MUSIC
    const [ music, setMusic ] = useState({});

    const temp = async() => {

    };

    useEffect(() => {
        temp();


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
            player.on('player_state_changed', ({ track_window, paused }) => { 
                const { current_track } = track_window;
                setCurrentPlaying(current_track);
                setPaused(paused);
            });
          
            // Ready
            player.on('ready', ({ device_id }) => {
                setDevice(device_id);
            });
        }

        dispatch(getPlayerState());

        console.log(device);
    }, [ songs.length ]);

    const play = () => {
        music.togglePlay();
        setPaused(!paused);
    };

    return (
        <div className='player'>
            {
                currentPlaying.id && 
                <div>
                    <div className='currently-playing'>
                        <img src={ currentPlaying.album.images[0].url } />
                        <h1>{ currentPlaying.name }</h1>
                    </div>
                    <div className='controls'>
                        <h1 onClick={ () => play() }>{ paused ? 'Play' : 'Pause' }</h1>
                    </div>
                </div>
            }
        </div>  
    );
};

export default SongPlayer;