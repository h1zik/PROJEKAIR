const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { ensureAuthenticated } = require('../config/auth');

// Render chat page
router.get('/chat', ensureAuthenticated, chatController.getChatPage);

// Get chat history
router.get('/chat/history', ensureAuthenticated, chatController.getChatHistory);

module.exports = router;