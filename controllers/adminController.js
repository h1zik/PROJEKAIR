// controllers/adminController.js
const User = require('../models/User');
const Product = require('../models/Product');
const Subscription = require('../models/Subscription');

// Display admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const userCount = await User.count();
    const productCount = await Product.count();
    const subscriptionCount = await Subscription.count();
    res.render('admin/dashboard', { userCount, productCount, subscriptionCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Display manage products page
exports.getManageProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('admin/manageProducts', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Display manage subscriptions page
exports.getManageSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({ include: [User, Product] });
    res.render('admin/manageSubscriptions', { subscriptions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Display manage users page
exports.getManageUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('admin/manageUsers', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add or update a product
exports.addOrUpdateProduct = async (req, res) => {
  const { id, name, description, price, available } = req.body;
  try {
    if (id) {
      await Product.update({ name, description, price, available }, { where: { id } });
    } else {
      await Product.create({ name, description, price, available });
    }
    res.redirect('/admin/manage-products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/manage-products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update subscription status
exports.updateSubscriptionStatus = async (req, res) => {
  try {
    await Subscription.update({ status: req.body.status }, { where: { id: req.params.id } });
    res.redirect('/admin/manage-subscriptions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/manage-users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};