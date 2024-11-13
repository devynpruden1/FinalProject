// routes/product.js
const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock'); // Import the Stock model

// GET Product page
router.get('/', async (req, res) => {
  try {
    const stockItems = await Stock.find(); // Fetch all stock items from MongoDB
    res.render('stock', { title: 'Stock List', stockItems });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
