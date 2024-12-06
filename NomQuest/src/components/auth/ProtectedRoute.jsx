import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, isAdmin } = useAuth();

  if (!userLoggedIn || !isAdmin) {
      // Redirect them to the home page if not logged in or not an admin
      return <Navigate to="/" />;
  }

  return children; // Render the children if authenticated
};

export default ProtectedRoute;