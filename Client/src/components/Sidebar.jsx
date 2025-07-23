import React from "react";

function Sidebar() {
  return (
    <>
      <div className="flex flex-col justify-between bg-gray-100 h-screen p-4 w-[20vw] min-w-[200px]">
        <div>
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="mx-auto h-12 w-auto" />
          </div>

          <nav className="flex flex-col space-y-4 text-gray-800 font-medium">
            <a href="/home" className="hover:text-blue-600 transition">
              Home
            </a>
            <a href="/my-bookings" className="hover:text-blue-600 transition">
              My Bookings
            </a>
            <a href="/about" className="hover:text-blue-600 transition">
              About Us
            </a>
          </nav>
        </div>
        <div>
          <button className="text-red-600 hover:text-red-800 font-medium transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
