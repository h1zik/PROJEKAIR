// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Synchronize models
sequelize.sync()
  .then(() => console.log('Models synchronized...'))
  .catch(err => console.log('Error synchronizing models: ' + err));

module.exports = sequelize;