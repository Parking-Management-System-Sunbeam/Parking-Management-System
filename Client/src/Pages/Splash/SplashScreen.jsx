import React from "react";

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-900 text-white z-50">
      <h1 className="text-3xl font-bold mb-4 animate-pulse">
        🚗 Online Parking System
      </h1>
      <div className="border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
}

export default SplashScreen;
