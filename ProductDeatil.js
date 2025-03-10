
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setReviews(data.reviews);
      } catch (err) {
        console.error(err);
        setError('Error fetching product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();
      setReviews([data.review, ...reviews]); 
      setRating(0);
      setComment(''); 
      setError(''); 
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <h3>Reviews:</h3>
      {reviews.map((review, index) => (
        <div key={index}>
          <p><strong>Rating:</strong> {review.rating} / 5</p>
          <p><strong>Comment:</strong> {review.comment}</p>
        </div>
      ))}

      <h3>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ProductDetail;