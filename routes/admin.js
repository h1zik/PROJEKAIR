// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../config/auth');

// Admin dashboard
router.get('/admin/dashboard', ensureAuthenticated, adminController.getDashboard);

// Manage products
router.get('/admin/manage-products', ensureAuthenticated, adminController.getManageProducts);
router.post('/admin/manage-products', ensureAuthenticated, adminController.addOrUpdateProduct);
router.post('/admin/manage-products/delete/:id', ensureAuthenticated, adminController.deleteProduct);

// Manage subscriptions
router.get('/admin/manage-subscriptions', ensureAuthenticated, adminController.getManageSubscriptions);
router.post('/admin/manage-subscriptions/update/:id', ensureAuthenticated, adminController.updateSubscriptionStatus);

// Manage users
router.get('/admin/manage-users', ensureAuthenticated, adminController.getManageUsers);
router.post('/admin/manage-users/delete/:id', ensureAuthenticated, adminController.deleteUser);

module.exports = router;