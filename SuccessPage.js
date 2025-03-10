
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ color: 'green' }}>Payment Successful!</h2>
      <p>Your order has been placed. Thank you for shopping with us.</p>
      <p>
        <Link to="/" style={{ marginRight: '10px' }}>Go to Home</Link>
        <Link to="/orders" style={{ marginLeft: '10px' }}>View Orders</Link>
      </p>
    </div>
  );
};

export default SuccessPage;