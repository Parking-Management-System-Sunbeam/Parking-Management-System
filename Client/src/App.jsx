import React from "react";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/User/Home";
import SearchComponent from "./Components/SearchComponent";
import SignUp from "./Pages/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
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
const App = () => {
  return (
    <Routes>
      {/* auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* user */}
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<SearchComponent />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/booking" element={<Bookings />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment-component" element={<PaymentComponent />} />
      <Route path="/pay-details" element={<PayDetails />} />
      <Route path="/details" element={<Details />} />

      {/* Admin */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-place" element={<Addplace />} />
      <Route path="/edit-place" element={<EditPlace />} />
      <Route path="/earning" element={<Earning />} />
    </Routes>
  );
};

export default App;
