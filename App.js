import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/Home/ProductList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import CartProvider from './context/CartContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AdminProductForm from './components/AdminProductForm';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <h1>My E-Commerce Site</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/product/create" element={<AdminProductForm />} />
            <Route path="/admin/product/edit/:productId" element={<AdminProductForm />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/cancel" element={<CancelPage />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            {/* Admin Dashboard */}
            <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} role="admin" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;