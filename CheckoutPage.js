
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('your-publishable-key');  

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before checking out.');
      return;
    }

    setLoading(true);

    // Send the cart details to the backend to create a checkout session
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const sessionData = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (error) {
        console.error('Stripe checkout error', error);
        // Display error message in the UI instead of alert
        alert('Error redirecting to checkout');
      }
    } catch (error) {
      console.error('Error initiating payment', error);
      // Display error message in the UI instead of alert
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </div>
  );
};

export default CheckoutPage;