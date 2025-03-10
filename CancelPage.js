
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const CancelPage = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  const handleContinueShopping = () => {
    navigate(-1); 
  };

  return (
    <div className="cancel-page">
      <h2>Payment Canceled</h2>
      <p>Your payment has been canceled. Feel free to try again.</p>
      <div>
        <button onClick={handleGoHome}>Go to Home</button>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CancelPage;
