
const express = require('express');
const Product = require('../models/Product');
const isAdmin = require('../middleware/admin');
const router = express.Router();

// Add new product
router.post('/products', isAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl, stock, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Update product details
router.put('/products/:productId', isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, imageUrl, stock, category } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, imageUrl, stock, category },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/products/:productId', isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
