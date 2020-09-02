const { socketServer } = require('../index');
const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

// models
const { Song, Room, User, Queue } = require('../db/models');

module.exports = router;

// root route is /api/song
router.get('/', async(req, res, next) => {
    try {
        res.send(await Song.findAll());
    } catch(err) {
        next(err);
    }
});

router.post('/', async(req, res, next) => {
    // const { id, name, artist, spotifyUri, imageUri } = req.body;
    try {
        const song = await Song.create(req.body);
        res.send(song);
    } catch(err) {
        next(err);
    }
});

// enqueue
router.post('/addtoqueue/:id', async(req, res, next) => {
    const { id } = req.params;
    const { queueId } = req.body;
    try {
        const song = await Song.findByPk(id);
        await song.update({ queueId });
        res.send(await Queue.findByPk(queueId, { include: [ Song ] }));
    } catch(err) {
        next(err);
    }
});

// dequeue
router.post('/removefromqueue/:id', async(req, res, next) => {
    const { id } = req.params;
    const { queueId } = req.body;
    try {
        // const songs = (await Queue.findByPk(queueId, { include: [ Song ] }));
        // await songs.destroy({ where: { id }});
        // res.send(songs);
    } catch(err) {
        next(err);
    }
});

// top
router.get('/top', async(req, res, next) => {
    const { queueId } = req.body;
    try {
        
    } catch(err) {  
        next(err);
    }
});

router.post('/playlist', async(req, res, next) => {
    const { playlist, queueId } = req.body;
    try {
        const queue = [];
        for(const song of playlist) {
            queue.push(await Song.create({...song, queueId }));
        }
        console.log(queue);
        res.send(queue);
    } catch(err) {
        next(err);
    }
});