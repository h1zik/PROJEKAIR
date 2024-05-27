const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Login User
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'No user with that email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Password incorrect' });

    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

exports.login = passport.authenticate('local', {
  successRedirect: '/catalog',
  failureRedirect: '/login',
  failureFlash: true
});

// Logout User
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
};

// Render login page
exports.getLoginPage = (req, res) => {
  res.render('login');
};

// Render register page
exports.getRegisterPage = (req, res) => {
  res.render('register');
};