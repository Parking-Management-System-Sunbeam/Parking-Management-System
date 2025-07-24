import React from "react";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/User/Home";
import SearchComponent from "./Components/SearchComponent";
import SignUp from "./Pages/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/User/AboutUs";
import Bookings from "./Pages/User/Bookings";
import Details from "./Pages/User/Details";
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<Bookings />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default App;
