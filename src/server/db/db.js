const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/spotify_app",
  { logging: false }
);

module.exports = db;
