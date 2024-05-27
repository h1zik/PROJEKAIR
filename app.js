// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');
const Subscription = require('./models/Subscription');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const subscriptionRoutes = require('./routes/subscription');
const adminRoutes = require('./routes/admin');

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', subscriptionRoutes);
app.use('/', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));