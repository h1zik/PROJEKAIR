const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const subscriptionController = require('../controllers/subscriptionController');
const adminController = require('../controllers/adminController');
const chatController = require('../controllers/chatController');
const reviewController = require('../controllers/reviewController');
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Product routes
router.get('/catalog', ensureAuthenticated, productController.getCatalog);
router.post('/catalog', ensureAuthenticated, productController.addProduct);
router.get('/products/:id', ensureAuthenticated, productController.getProductDetails);

// Subscription routes
router.get('/subscriptions', ensureAuthenticated, subscriptionController.getUserSubscriptions);
router.post('/subscriptions', ensureAuthenticated, subscriptionController.addSubscription);
router.post('/subscriptions/cancel/:id', ensureAuthenticated, subscriptionController.cancelSubscription);

// Admin routes
router.get('/admin/dashboard', ensureAdmin, adminController.getDashboard);
router.get('/admin/manage-products', ensureAdmin, adminController.getManageProducts);
router.post('/admin/manage-products', ensureAdmin, adminController.addOrUpdateProduct);
router.post('/admin/manage-products/delete/:id', ensureAdmin, adminController.deleteProduct);
router.get('/admin/manage-subscriptions', ensureAdmin, adminController.getManageSubscriptions);
router.post('/admin/manage-subscriptions/update/:id', ensureAdmin, adminController.updateSubscriptionStatus);
router.get('/admin/manage-users', ensureAdmin, adminController.getManageUsers);
router.post('/admin/manage-users/delete/:id', ensureAdmin, adminController.deleteUser);

// Chat routes
router.get('/chat', ensureAuthenticated, chatController.getChatPage);
router.get('/chat/history', ensureAuthenticated, chatController.getChatHistory);

// Review routes
router.post('/reviews', ensureAuthenticated, reviewController.submitReview);
router.get('/products/:id', ensureAuthenticated, reviewController.getProductReviews);

module.exports = router;