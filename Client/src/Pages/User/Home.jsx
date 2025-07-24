import React from "react";
import Sidebar from "../../components/Sidebar";
import SearchComponent from "../../Components/SearchComponent";

function Home() {
  return (
    <div className="flex">
      {/* sidebar */}
      <div className=" flex-1/6">

      <Sidebar />
      </div>

      {/* Main page */}
      <div className="flex-4/5 p-4 items-center mt-9">
      <SearchComponent />
        </div>

        <div className="flex-1/6 p-9">
          <div className="w-20 h-20 bg-gray-800 rounded-full"></div>
        </div>
    </div>
  );
}

export default Home;
