// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('water_stream', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Enable logging
  });
  
  // Sync database schema
  sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
  });

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Synchronize models
sequelize.sync()
  .then(() => console.log('Models synchronized...'))
  .catch(err => console.log('Error synchronizing models: ' + err));

module.exports = sequelize;