
import Login from "./Pages/Auth/Login";
import Home from "./Pages/User/Home";
import SearchComponent from "./Components/SearchComponent";
import SignUp from "./Pages/Auth/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/User/AboutUs";
import Bookings from "./Pages/User/Bookings";
import Payment from "./Pages/User/Payment";
import OrderSummary from "./Components/OrderSummary";
import PaymentComponent from "./Components/PaymentComponent";
import PayDetails from "./Components/PayDetails";

import Dashboard from "./Pages/Admin/Dashboard";

import Addplace from "./Pages/Admin/Addplace";
import Earning from "./Pages/Admin/Earning";
import EditPlace from "./Pages/Admin/EditPlace";
import Details from "./Pages/User/Details";
import SplashScreen from "./Pages/Splash/SplashScreen";
import SlotBooking from "./Pages/User/SlotBooking";


// Context
import { AuthProvider, useAuth } from "./Context/AuthContext";

import ProtectedRoute, { AdminRoute, UserRoute } from "./Components/PotectedRoutes";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const InitialRouteHandler = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowSplash(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  if (!isAuthenticated) {
    return <Login />;
  }

  // Redirect based on user role
  if (user?.userRole === 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Initial Route */}
      <Route path="/" element={<InitialRouteHandler />} />
      
      {/* Auth Routes - Only accessible when not authenticated */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Login />
        } 
      />
      <Route 
        path="/signup" 
        element={
          isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <SignUp />
        } 
      />

      {/* User Routes - Protected and accessible to authenticated users */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/search" 
        element={
          <ProtectedRoute>
            <SearchComponent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/about-us" 
        element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/booking" 
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment" 
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/order-summary" 
        element={
          <ProtectedRoute>
            <OrderSummary />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment-component" 
        element={
          <ProtectedRoute>
            <PaymentComponent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pay-details" 
        element={
          <ProtectedRoute>
            <PayDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/details" 
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/slot-booking" 
        element={
          <ProtectedRoute>
            <SlotBooking />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes - Only accessible to admin users */}
      <Route 
        path="/dashboard" 
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } 
      />
      <Route 
        path="/add-place" 
        element={
          <AdminRoute>
            <Addplace />
          </AdminRoute>
        } 
      />
      <Route 
        path="/edit-place" 
        element={
          <AdminRoute>
            <EditPlace />
          </AdminRoute>
        } 
      />
      <Route 
        path="/earning" 
        element={
          <AdminRoute>
            <Earning />
          </AdminRoute>
        } 
      />

      {/* Catch all route - redirect to appropriate home based on role */}
      <Route 
        path="*" 
        element={
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
        
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
};

export default App;
