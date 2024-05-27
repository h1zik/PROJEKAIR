// controllers/subscriptionController.js
const Subscription = require('../models/Subscription');
const Product = require('../models/Product');

// Display user subscriptions
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { userId: req.user.id },
      include: Product
    });
    const products = await Product.findAll();
    res.render('subscriptions', { subscriptions, products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add a new subscription
exports.addSubscription = async (req, res) => {
  const { productId, endDate } = req.body;
  try {
    await Subscription.create({
      userId: req.user.id,
      productId,
      endDate,
      status: 'active'
    });
    res.redirect('/subscriptions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Cancel a subscription
exports.cancelSubscription = async (req, res) => {
  try {
    await Subscription.update(
      { status: 'cancelled' },
      { where: { id: req.params.id, userId: req.user.id } }
    );
    res.redirect('/subscriptions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};