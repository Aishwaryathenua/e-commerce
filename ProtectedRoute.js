
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ element, role, ...rest }) => {
  const user = authService.getCurrentUser ();

  if (role && user && user.role !== role) {
    
    return <Navigate to="/" />;
  }

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;