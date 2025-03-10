
const express = require('express');
const Order = require('../models/Order');
const isAdmin = require('../middleware/admin');
const router = express.Router();

// Get all orders for admin
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('cart.productId', 'name price');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update order status to "shipped" or "completed"
router.put('/orders/:orderId/status', isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['shipped', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
