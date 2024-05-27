const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { ensureAuthenticated } = require('../config/auth');

// Display user subscriptions
router.get('/subscriptions', ensureAuthenticated, subscriptionController.getUserSubscriptions);

// Add a new subscription
router.post('/subscriptions', ensureAuthenticated, subscriptionController.addSubscription);

// Cancel a subscription
router.post('/subscriptions/cancel/:id', ensureAuthenticated, subscriptionController.cancelSubscription);

module.exports = router;