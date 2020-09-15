const Sequelize = require('sequelize')
const db = require('../db')
const {UUID, UUIDV4, INTEGER, STRING} = Sequelize

const User = db.define('user', {
  id: {
    type: STRING,
    primaryKey: true,
  },
  display_name: {
    type: STRING,
    allowNull: false,
    validators: {
      notEmpty: true
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validators: {
      notEmpty: true
    },
  },
  image: {
    type: STRING,
    allowNull: true
  },
  uri: {
    type: STRING,
    allowNull: false,
    validators: {
      notEmpty: true
    },
  },

})

module.exports = User