
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddToCart = async () => {
    setLoading(true);
    setError('');

    try {
      await addToCart(product); 
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;