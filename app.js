const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');
const Subscription = require('./models/Subscription');
const Message = require('./models/Message');
const Review = require('./models/Review');
const { ensureAuthenticated, ensureAdmin } = require('./config/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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
const protectedRoutes = require('./routes/protectedRoutes');
const productRoutes = require('./routes/product');
const subscriptionRoutes = require('./routes/subscription');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat');
const reviewRoutes = require('./routes/review');

app.use('/', authRoutes);

// Public route for the homepage
app.get('/', (req, res) => {
  res.render('home');
});

// Apply ensureAuthenticated middleware to all protected routes
app.use(ensureAuthenticated);
app.use('/', protectedRoutes);
app.use('/', productRoutes);
app.use('/', subscriptionRoutes);
app.use('/', chatRoutes);
app.use('/', reviewRoutes);

// Apply ensureAdmin middleware to all admin routes
app.use('/admin', ensureAdmin, adminRoutes);

// Socket.io setup
io.on('connection', socket => {
  console.log('New client connected');

  // Handle incoming messages
  socket.on('chatMessage', async msg => {
    const message = await Message.create({
      userId: msg.userId,
      content: msg.content
    });

    io.emit('chatMessage', { user: msg.user, content: msg.content, timestamp: new Date() });
  });

  // Handle admin replies
  socket.on('adminReply', async reply => {
    const message = await Message.findByPk(reply.messageId);
    if (message) {
      message.adminReply = reply.reply;
      await message.save();
      io.emit('adminReply', { adminReply: reply.reply, timestamp: new Date() });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));