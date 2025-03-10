
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { orderId } = useParams(); 
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrderDetails(data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setOrderDetails(null); 
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (orderDetails === null) return <p>Order not found or an error occurred.</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {orderDetails._id}</p>
      <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
      <p><strong>Status:</strong> {orderDetails.paymentStatus}</p>
      <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
      <p><strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>

      <h3>Items in Order</h3>
      <ul>
        {orderDetails.cart.map((item) => (
          <li key={item.productId}>
            <p><strong>{item.productName}</strong></p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsPage;