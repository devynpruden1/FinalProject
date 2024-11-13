const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


router.get('/stock', function(req, res, next) {
  res.render('index', { title: 'stock list' });
});

module.exports = router;
