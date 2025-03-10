
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; 
import axios from 'axios';
import AdminProductForm from './AdminProductForm';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch products and orders
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Fetch products
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productsResponse.data);

        // Fetch orders
        const ordersResponse = await fetch('http://localhost:5000/api/admin/orders', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (ordersResponse.status === 403) {
          setUnauthorized(true);
          return;
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData.orders);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrders(orders.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    }
  };

  const handleAddProduct = async (productId, product) => {
    const method = productId ? 'PUT' : 'POST';
    const url = productId
      ? `http://localhost:5000/api/products/${productId}`
      : 'http://localhost:5000/api/products';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (response.ok) {
        if (productId) {
          setProducts(products.map((p) => (p._id === data._id ? data : p)));
        } else {
          setProducts([...products, data]); 
        }
        setEditingProductId(null); 
      } else {
        console.error('Error:', data.message);
        setError(data.message || 'Failed to add/edit product. Please try again.');
      }
    } catch (error) {
      console.error('Error handling product add/edit', error);
      setError('Failed to add/edit product. Please try again.');
    }
  };

  if (unauthorized) return <Navigate to="/" />; 
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Product Form */}
      <AdminProductForm productId={editingProductId} onSubmit={handleAddProduct} />

      {/* Product List */}
      <div>
        <h3>Manage Products</h3>
        <button onClick={() => setEditingProductId(null)}>Add New Product</button>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <p><strong>{product.name}</strong></p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleEditProduct(product._id)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Orders List */}
      <div>
        <h3>Manage Orders</h3>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                <p><strong>Status:</strong> {order.paymentStatus}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

                <button onClick={() => handleStatusChange(order._id, 'shipped')}>Mark as Shipped</button>
                <button onClick={() => handleStatusChange(order._id, 'completed')}>Mark as Completed</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;