const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, INTEGER, STRING, TEXT} = Sequelize

const Song = db.define('song', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validators: {
        notEmpty: true,
    }
  },
  artist: {
    type: STRING,
    allowNull: false,
    validators: {
        notEmpty: true,
    }
  },
  spotifyUri: {
    type: STRING,
    allowNull: false,
    validators: {
        notEmpty: true,
    }
  },
  imageUri: {
    type: STRING,
    allowNull: false,
    validators: {
        notEmpty: true,
    }
  },
})

module.exports = Song