
import React, { useState, useEffect } from 'react';

const AdminProductForm = ({ productId, onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/admin/products/${productId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }

          const data = await response.json();
          setProduct(data);
        } catch (err) {
          console.error(err);
          setError('Error fetching product details. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.price < 0 || product.stock < 0) {
      setError('Price and stock must be non-negative numbers.');
      return;
    }
    setError(''); 

    await onSubmit(productId, product); 
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required min="0" />
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
      </div>
      <div>
        <label>Stock</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} required min="0" />
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} required />
      </div>
      <button type="submit">{productId ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default AdminProductForm;