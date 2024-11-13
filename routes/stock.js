// routes/product.js
const express = require('express');
const router = express.Router();
const Stock = require('../model/Stock'); // Import the Stock model

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

router.get('/add', async (req, res) => {
  try {
    res.render('Parts/add', { title: 'Add' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post('/add',async(req,res,next)=>{
  try{
      let newPart = Stock({
          "Description":req.body.description,
          "Item":req.body.item,
          "Price":req.body.price,
      });
      Stock.create(newPart).then(()=>{
          res.redirect('/stock');
      });
    }
  catch(err)
  {
      console.error(err);
      res.render('Parts/add',{
          error:'Error on the server'
      })
  }
});

module.exports = router;
