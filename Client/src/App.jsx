import React from 'react'
import Login from './Pages/Auth/Login'
import SearchComponent from './Components/SearchComponent'
import SignUp from './Pages/Auth/SignUp'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
