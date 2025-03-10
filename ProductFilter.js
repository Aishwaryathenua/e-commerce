
import React, { useState } from 'react';

const ProductFilter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate price range
    if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
      alert('Minimum price cannot be greater than maximum price.');
      return;
    }

    onFilter({ search, category, minPrice, maxPrice });
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onFilter({ search: '', category: '', minPrice: '', maxPrice: '' }); 
  };

  return (
    <div className="product-filter">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name"
            aria-label="Search by product name"
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Select product category"
          >
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            {/* Add more categories */}
          </select>
        </div>

        <div>
          <label htmlFor="minPrice">Price Range:</label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            aria-label="Minimum price"
          />
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            aria-label="Maximum price"
          />
        </div>

        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleClearFilters}>Clear Filters</button>
      </form>
    </div>
  );
};

export default ProductFilter;