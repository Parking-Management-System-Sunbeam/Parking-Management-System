import React from "react";

import logo from "../../assets/Parkit.png";
import { useNavigate } from "react-router-dom";
function SplashScreen() {
  const nav = useNavigate();
  return (
    // <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-900 text-white z-50">
    //   <h1 className="text-3xl font-bold mb-4 animate-pulse">
    //     🚗 Online Parking System
    //   </h1>
    //   <div className="border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
    // </div>
    <>
<div class="relative min-h-screen bg-cover bg-center bg-[url(https://images.pexels.com/photos/9433064/pexels-photo-9433064.jpeg)]"  >
  <div class="absolute inset-0 bg-black/50"></div> 

  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
    <img src={logo} alt="Logo" className="w-42 mb-6 rounded-full" />
    <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Welcome to <span className="text-[#ffbd59]">Park It</span></h1>
    <p class="text-lg md:text-xl mb-6 max-w-xl drop-shadow-md">Your journey to smarter solutions begins here. Let’s get started!</p>
    <button onClick={()=> nav("/login")} class="cursor-pointer bg-[#ffbd59] hover:bg-[#ffbd59ef] text-white px-6 py-3 rounded-xl text-lg font-semibold transition shadow-lg">
      Get Started
    </button>
  </div>
</div>
    
    </>
  );
}

export default SplashScreen;
