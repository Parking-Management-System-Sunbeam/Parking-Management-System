import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';


const ProtectedRoutes = ({ 
  children, 
  requiredRole = null, 
  adminOnly = false, 
  userOnly = false 
}) => {
  const { isAuthenticated, user, loading, hasRole, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast.warning('Please login to access this page.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin-only routes
  if (adminOnly && !isAdmin()) {
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/home" replace />;
  }

  // Check user-only routes (if you want to restrict admin from user pages)
  if (userOnly && isAdmin()) {
    toast.info('Redirecting to admin dashboard.');
    return <Navigate to="/dashboard" replace />;
  }

  // Check specific role requirements
  if (requiredRole && !hasRole(requiredRole)) {
    toast.error(`Access denied. ${requiredRole} role required.`);
    const redirectPath = isAdmin() ? '/dashboard' : '/home';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Higher-order component for role-based route protection
export const withRoleProtection = (Component, options = {}) => {
  return (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Specific route protection components
export const AdminRoute = ({ children }) => (
  <ProtectedRoutes adminOnly={true}>
    {children}
  </ProtectedRoutes>
);

export const UserRoute = ({ children }) => (
  <ProtectedRoutes userOnly={true}>
    {children}
  </ProtectedRoutes>
);

export const AuthRoute = ({ children }) => (
  <ProtectedRoutes>
    {children}
  </ProtectedRoutes>
);

export default ProtectedRoutes;