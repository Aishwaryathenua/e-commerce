
import React, { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import ProductCard from './ProductCard'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(''); 
      try {
        const { search, category, minPrice, maxPrice } = filters;
        const response = await fetch(
          `http://localhost:5000/api/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="product-list">
      <ProductFilter onFilter={handleFilterChange} />
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="products">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;