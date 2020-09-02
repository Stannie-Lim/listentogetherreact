const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

// models
const { Room, Queue, Song } = require('../db/models');

// root route is /api/queue
module.exports = router;

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        res.send((await Queue.findByPk(id, { include: [ Song ], order: [ 'updatedAt' ] })));
    } catch(err) {
        next(err);
    }
});

router.get('/get/all', async(req, res, next) => {
    res.send(await Queue.findAll({ include: [Song] }));
});

router.post('/:roomId', async(req, res, next) => {
    const { roomId } = req.params;
    try {
        let queue = await Queue.findOne({ where: { roomId }});
        if(!queue) {
            queue = await Queue.create({ roomId });
        }
        res.send(queue);
    } catch(err) {
        next(err);
    }
});