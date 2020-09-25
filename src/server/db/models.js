const db = require('./db')

// register models
const {
  Room,
  User,
  Queue,
  Song,
  PlayerState
} = require('./models/relations')

module.exports = {
  db,
  Room,
  User,
  Queue, 
  Song,
  PlayerState
}