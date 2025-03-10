
const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-stripe-secret-key');  // Replace with your secret key
const router = express.Router();

// Endpoint to create a Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart, userId, shippingAddress } = req.body;  // Receive cart details from the frontend

    //Calculate total amount
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Map cart items to Stripe's line items format
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,  // Stripe accepts prices in cents
      },
      quantity: item.quantity,
    }));

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    // Send the session ID back to the frontend
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
