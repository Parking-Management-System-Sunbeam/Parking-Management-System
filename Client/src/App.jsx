import React from 'react'
import Login from './Pages/Auth/Login'
import Home from './Pages/User/Home'
import SearchComponent from './Components/SearchComponent'
import SignUp from './Pages/Auth/SignUp'
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Pages/User/AboutUs'
import Bookings from './Pages/User/Bookings'
import Dashboard from './Pages/Admin/Dashboard'
import AddPlace from './Pages/Admin/Addplace'
import EditPlace from './Pages/Admin/EditPlace'
import Earning from './Pages/Admin/Earning'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<Bookings />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path='/dashboard' element={<Dashboard />} />
      
      <Route path="/add-place" element={<AddPlace />} />
      <Route path="/edit-place" element={< EditPlace/>} />
      <Route path='/earning' element={<Earning />} />
    </Routes>
  );
};

export default App;
