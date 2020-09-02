const { socketServer } = require('../index');
const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

// models
const { Room, User, Queue, Song } = require('../db/models');

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
        const room = await Room.create({ id: roomId });
        res.send(room);
    } catch(err) {
        next(err);
    }
});