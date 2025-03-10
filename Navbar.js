
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser  } from '../../redux/actions/userActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading); 

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser ());
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };

  return (
    <nav>
      <h1>Quick Commerce</h1>
      <div>
      <Link to="/" aria-label="Home">Home</Link>
      <Link to="/cart" aria-label="Cart">Cart</Link>
      <Link to="/checkout">Checkout</Link>
      {loading ? (
        <span>Loading...</span> 
      ) : user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" aria-label="Login">Login</Link>
          <Link to="/register" aria-label="Register">Register</Link>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;