const Room = require('./Room');
const User = require('./User');
const Queue = require('./Queue');
const Song = require('./Song');

User.belongsTo(Room);
Room.hasMany(User);
Queue.belongsTo(Room);
Room.hasOne(Queue);

Queue.hasMany(Song);
Song.belongsTo(Queue);

module.exports = {
    Room,
    User,
    Queue,
    Song,
}