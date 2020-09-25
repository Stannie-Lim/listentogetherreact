const { BOOLEAN, BIGINT } = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, TINYINT, STRING } = Sequelize

const PlayerState = db.define('playerstate', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  context: {
    type: STRING
  },
  position: {
    type: BIGINT
  }, 
  paused: {
    type: BOOLEAN
  },
})

module.exports = PlayerState