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

import { AuthProvider, useAuth } from "./Context/AuthContext";
import ProtectedRoute, { AdminRoute, UserRoute } from "./Components/PotectedRoutes";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const InitialRouteHandler = () => {
  const { isAuthenticated, user } = useAuth();
  const [showSplash, setShowSplash] = useState(false); // disabled splash

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (user?.userRole === "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Initial Route */}
      <Route path="/" element={<InitialRouteHandler />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={user?.userRole === "ADMIN" ? "/dashboard" : "/home"} replace />
            : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated
            ? <Navigate to={user?.userRole === "ADMIN" ? "/dashboard" : "/home"} replace />
            : <SignUp />
        }
      />

      {/* User Routes */}
      <Route path="/home" element={<UserRoute><Home /></UserRoute>} />
      <Route path="/search" element={<UserRoute><SearchComponent /></UserRoute>} />
      <Route path="/about-us" element={<UserRoute><AboutUs /></UserRoute>} />
      <Route path="/booking" element={<UserRoute><Bookings /></UserRoute>} />
      <Route path="/payment" element={<UserRoute><Payment /></UserRoute>} />
      <Route path="/order-summary" element={<UserRoute><OrderSummary /></UserRoute>} />
      <Route path="/payment-component" element={<UserRoute><PaymentComponent /></UserRoute>} />
      <Route path="/pay-details" element={<UserRoute><PayDetails /></UserRoute>} />
      <Route path="/details" element={<UserRoute><Details /></UserRoute>} />
      <Route path="/slot-booking" element={<UserRoute><SlotBooking /></UserRoute>} />

      {/* Admin Routes */}
      <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/add-place" element={<AdminRoute><Addplace /></AdminRoute>} />
      <Route path="/edit-place" element={<AdminRoute><EditPlace /></AdminRoute>} />
      <Route path="/earning" element={<AdminRoute><Earning /></AdminRoute>} />

      {/* Catch All */}
      <Route path="*" element={
        <ProtectedRoute>
          <Navigate to={user?.userRole === "ADMIN" ? "/dashboard" : "/home"} replace />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
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
