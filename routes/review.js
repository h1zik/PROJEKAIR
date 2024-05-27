// routes/review.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { ensureAuthenticated } = require('../config/auth');

// Submit a review
router.post('/reviews', ensureAuthenticated, reviewController.submitReview);

// Get reviews for a product
router.get('/products/:id', reviewController.getProductReviews);

module.exports = router;