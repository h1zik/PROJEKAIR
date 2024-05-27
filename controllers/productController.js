// controllers/productController.js
const Product = require('../models/Product');

// Display product catalog
exports.getCatalog = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('catalog', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new product (admin only)
exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    await Product.create({ name, description, price });
    res.redirect('/catalog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};