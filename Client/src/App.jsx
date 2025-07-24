import React from 'react'
import Login from './Pages/Auth/Login'
import SearchComponent from './Components/SearchComponent'
import SignUp from './Pages/Auth/SignUp'
import Listing from './Components/Listing';

const App = () => {
  return (
    <Listing/>
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/home" element={<Home />} />
    // </Routes>
  );
};

export default App;
