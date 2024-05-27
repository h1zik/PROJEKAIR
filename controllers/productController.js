const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

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

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, available } = req.body;
  try {
    await Product.create({ name, description, price, available });
    res.redirect('/catalog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get product details
exports.getProductDetails = async (req, res) => {  // Ensure this matches the method name in your routes file
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          include: [User]
        }
      ]
    });
    res.render('product/productDetails', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};