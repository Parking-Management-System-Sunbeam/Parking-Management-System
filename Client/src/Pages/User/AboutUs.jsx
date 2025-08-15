
import React from 'react'
import Sidebar from '../../components/Sidebar';

const AboutUs = () => {
  return (
       <div className="flex">
      <div className=" flex-1/6">

      <Sidebar />
      </div>
      <div className="flex-4/5 p-4">
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to <span className="font-semibold text-gray-800">Park It</span> — your smart solution for hassle-free parking. We aim to make finding, reserving, and managing parking spots seamless and stress-free.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Whether you're heading to work, shopping, or out for fun, Park It connects drivers to nearby, available parking spaces in real time. No more circling blocks or wasting fuel.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          With our user-friendly app, transparent pricing, and secure booking, parking becomes effortless. Our mission is to transform urban mobility and make every trip smoother.
        </p>
        <p className="text-lg text-gray-600">
          Thank you for choosing <span className="font-semibold text-gray-800">Park It</span>. Park smart. Park easy.
        </p>
      </div>
    </div> </div>
    </div>
  );
}

export default AboutUs
