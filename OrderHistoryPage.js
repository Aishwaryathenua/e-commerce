
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch(`http://localhost:5000/api/orders/user-orders?page=${page}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders);
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return; 
    fetchOrders(page);
  };

  return (
    <div>
      <h2>Your Order History</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <Link to={`/orders/${order._id}`}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                <p><strong>Status:</strong> {order.paymentStatus}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1 || loading}
        >
          Previous
        </button>
        <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderHistoryPage;