var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../model/user'); 

// Render Register Page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Handle Registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const newUser = new User({ username, displayName });
    await User.register(newUser, password); 
    res.redirect('/'); 
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Handle Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/stock', 
    failureRedirect: '/login', 
  })
);

// Handle Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect('/'); 
  });
});

module.exports = router;
