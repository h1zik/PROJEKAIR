// controllers/reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

// Submit a review
exports.submitReview = async (req, res) => {
  const { productId, rating, review } = req.body;
  try {
    await Review.create({
      userId: req.user.id,
      productId,
      rating,
      review
    });
    res.redirect(`/products/${productId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
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