
const express = require('express');
const Product = require('../models/Product');
const isAuth = require('../middleware/auth');
const router = express.Router();

// Add a review to a product
router.post('/products/:productId/reviews', isAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = { userId: req.user.id, rating, comment };
    product.reviews.push(review);
    await product.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review' });
  }
});

module.exports = router;
