import React from "react";
import Login from "./Pages/Auth/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/User/Home";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
