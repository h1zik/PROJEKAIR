// controllers/chatController.js
const Message = require('../models/Message');
const User = require('../models/User');

// Render chat page
exports.getChatPage = (req, res) => {
  res.render('chat', { user: req.user });
};

// Get chat history
exports.getChatHistory = async (req, res) => {
  try {
    const messages = await Message.findAll({ include: User, order: [['timestamp', 'ASC']] });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};