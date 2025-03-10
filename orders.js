
const express = require('express');
const Order = require('../models/Order');
const isAuth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const router = express.Router();

// Admin: Get all orders
router.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Admin: Update order status
router.put('/:orderId', isAuth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).send('Internal Server Error');
  }
});

// User: Create an order
router.post('/create-order', isAuth, async (req, res) => {
  try {
    const { userId, cart, totalAmount, shippingAddress } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      cart,
      totalAmount,
      shippingAddress,
      paymentStatus: 'completed',  // You can set this based on actual payment success/failure
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Internal Server Error');
  }
});

// User: Get user orders with pagination
router.get('/user-orders', isAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit of 10 orders
    const orders = await Order.find({ userId: req.user.id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ orderDate: -1 });

    const totalOrders = await Order.countDocuments({ userId: req.user.id });

    res.json({
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
