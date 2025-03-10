const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Middleware and routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // Keep this only once
const orderRoutes = require('./routes/orders');
const checkoutRoutes = require('./routes/checkout');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch((err) => console.log('MongoDB connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // You already declared this once
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
