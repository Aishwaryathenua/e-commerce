
const express = require('express');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Get current user's details
router.get('/:id', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      res.json({ username: user.username, email: user.email });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Invalid token' });
  }
});

module.exports = router;



