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
        let state = await PlayerState.findOne({ where: { roomId: id }});

        if(state !== null) {
            await state.update({ context, position, paused });
            const { image, artist, uri, name } = current_track;
            const song = await Song.findOne({ where: { currentTrackId: state.id }});
            await song.update({ image, artist, spotifyUri: uri, name });

            for(const song of previous_tracks) {
                const { image, artist, uri, name } = song;
                const foundSong = await Song.findOne({ where: { previousTrackId: state.id }});
                await foundSong.update({ image, artist, spotifyUri: uri, name, previousTrackId: state.id });
            }

            for(const song of next_tracks) {
                const { image, artist, uri, name } = song;
                const foundSong = await Song.findOne({ where: { nextTrackId: state.id }});
                await foundSong.update({ image, artist, spotifyUri: uri, name, nextTracksId: state.id });
            }   

        } else {
            state = await PlayerState.create({ roomId: id, context, position, paused });
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

        res.send(state);


    } catch(err) {
        next(err);
    }
});