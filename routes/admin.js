const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../config/auth');

// Apply ensureAdmin middleware to all admin routes
router.use(ensureAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/manage-products', adminController.getManageProducts);
router.post('/manage-products', adminController.addOrUpdateProduct);
router.post('/manage-products/delete/:id', adminController.deleteProduct);
router.get('/manage-subscriptions', adminController.getManageSubscriptions);
router.post('/manage-subscriptions/update/:id', adminController.updateSubscriptionStatus);
router.get('/manage-users', adminController.getManageUsers);
router.post('/manage-users/delete/:id', adminController.deleteUser);

module.exports = router;