// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Display product catalog
router.get('/catalog', productController.getCatalog);

// Add a new product (admin only)
router.post('/catalog', productController.addProduct);

module.exports = router;