const { Sequelize } = require('sequelize');

const URI = process.env.JAWSDB_URL || process.env.DB_URI;

if (!URI) {
  throw new Error('Missing URI for database connection');
}

module.exports = new Sequelize(URI);