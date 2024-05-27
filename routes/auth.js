const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render the registration page
router.get('/register', (req, res) => res.render('register'));

// Handle user registration
router.post('/register', authController.register);

// Render the login page
router.get('/login', (req, res) => res.render('login'));

// Handle user login
router.post('/login', authController.login);

// Handle user logout
router.get('/logout', authController.logout);

module.exports = router;