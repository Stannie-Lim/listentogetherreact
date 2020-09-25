const Room = require('./Room');
const User = require('./User');
const Queue = require('./Queue');
const Song = require('./Song');
const PlayerState = require('./PlayerState');

User.belongsTo(Room);
Room.hasMany(User);
Queue.belongsTo(Room);
Room.hasOne(Queue);

Queue.hasMany(Song);
Song.belongsTo(Queue);

PlayerState.hasOne(Song, { as: "currentTrack" });
// Song.belongsTo(PlayerState, { as: "current_track" }); 

PlayerState.hasOne(Song, { as: "nextTrack" });
// Song.belongsTo(PlayerState, { as: 'nextTrack'});

PlayerState.hasOne(Song, { as: "previousTrack" });
// Song.belongsTo(PlayerState, { as: "previousTrack" });

PlayerState.belongsTo(Room);

module.exports = {
    Room,
    User,
    Queue,
    Song,
    PlayerState,
}