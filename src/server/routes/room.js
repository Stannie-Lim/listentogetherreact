const { socketServer } = require('../index');
const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

// models
const { Room, User, Queue, Song, PlayerState } = require('../db/models');

module.exports = router;

// root route is /api/room

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        res.send(await Room.findByPk(id,
        {
            include: [Queue, User]
        }));
    } catch(err) {
        next(err);
    }
});

router.get('/get/all', async(req, res, next) => {
    try {
        res.send(await Room.findAll({include: [
            { model: User }, 
            { model: Queue, 
                include: [Song] 
            } 
        ]}));
    } catch(err) {
        next(err);
    }
});

router.post('/', async(req, res, next) => {
    const { id } = req.body;
    const roomId = Math.random().toString(36).substring(7);
    try {
        const room = await Room.create({ id: roomId }, { include: Queue });
        res.send(room);
    } catch(err) {
        next(err);
    }
});

router.get('/users/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const { users } = await Room.findByPk(id, { include: User });
        res.send(users);
    } catch(err) {
        next(err);
    }
});

router.get('/get/get/get', async(req, res, next) => {
    res.send(await PlayerState.findAll({
        include: [{
            model: Song,
            as: 'previousTrack'
        }, {
            model: Song,
            as: 'currentTrack',
        },{
            model: Song,
            as: 'nextTrack',
        }] 
    }));
});

router.get('/:id/playerstate', async(req, res, next) => {
    const { id } = req.params;
    try {
        res.send(await PlayerState.findOne({ where: { roomId: id }}, { include: Song,  }));
    } catch(err) {
        next(err);
    }
}); 

router.post('/:id/playerstate', async(req, res, next) => {
    const { id } = req.params;
    const { context, position, paused, current_track, next_tracks, previous_tracks } = req.body;
    try {
        let state = (await PlayerState.findOrCreate({ where: { roomId: id }, defaults: {roomId: id, context, position, paused }}))[0];
        if(state !== null) {
            await state.update({ context, position, paused });
            const { image, artist, uri, name } = current_track;
            const song = (await Song.findOrCreate({ where: { currentTrackId: state.id }, defaults: { image, artist, spotifyUri: uri, name, currentTrackId: state.id }}))[0];
            await song.update({ image, artist, spotifyUri: uri, name });

            for(const song of previous_tracks) {
                const { image, artist, uri, name } = song;
                const foundSong = (await Song.findOrCreate({ where: { previousTrackId: state.id }, defaults: { image, artist, spotifyUri: uri, name, previousTrackId: state.id }}))[0];
                await foundSong.update({ image, artist, spotifyUri: uri, name, previousTrackId: state.id });
            }

            for(let i = next_tracks.length - 1; i >= 0; i--) {
                const song = next_tracks[i];
                const { image, artist, uri, name } = song;
                const foundSong = (await Song.findOrCreate({ where: { nextTrackId: state.id }, defaults: { image, artist, spotifyUri: uri, name, nextTrackId: state.id }}))[0];
                await foundSong.update({ image, artist, spotifyUri: uri, name, nextTracksId: state.id });
            }   

        } else {
            const { image, artist, uri, name } = current_track;
            await Song.create({ image, artist, spotifyUri: uri, name, currentTrackId: state.id });

            for(const song of previous_tracks) {
                const { image, artist, uri, name } = song;
                await Song.create({ image, artist, spotifyUri: uri, name, previousTrackId: state.id });
            }

            for(const song of next_tracks) {
                const { image, artist, uri, name } = song;
                await Song.create({ image, artist, spotifyUri: uri, name, nextTrackId: state.id });
            }   
        }

        state = await PlayerState.findOne({ where: { roomId: id }}, {
            include: [{
                model: Song,
                as: 'previousTrack'
            }, {
                model: Song,
                as: 'currentTrack',
            },{
                model: Song,
                as: 'nextTrack',
            }] 
        });

        res.send(state);
    } catch(err) {
        next(err);
    }
});