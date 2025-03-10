
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => { 
      const user = authService.getCurrentUser ();
      if (!user) {
        setError('User  not logged in. Please log in to view your profile.');
        setLoading(false);
        navigate('/login'); 
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user.userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserData(response.data); 
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Profile;