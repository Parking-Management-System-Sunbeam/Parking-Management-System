import React from "react";
import Sidebar from "../../components/Sidebar";
import SearchComponent from "../../Components/SearchComponent";
import FilterComponent from "../../Components/FilterComponent";

function Home() {

  const filterOptions = [
    { label: "All", value: "all" , active: true},
    { label: "Cars", value: "cars" },
    { label: "Bikes", value: "bikes" },
    { label: "Trucks", value: "trucks" },
    { label: "Vans", value: "vans" },
    { label: "SUVs", value: "suvs" },
    { label: "Electric Vehicles", value: "electric" },
    { label: "Luxury Vehicles", value: "luxury" },
 { label: "Luxury Vehicles", value: "luxury" }
  ]

  return (
    <div className="flex">
      {/* sidebar */}
      <div className=" flex-1/6">

      <Sidebar />
      </div>

      {/* Main page */}
      <div className="flex-4/5 p-4 items-center mt-9  ">
      {/* search header */}
      <div className="flex justify-between items-center mb-6 ">

      <SearchComponent />
        <div className="flex items-center">
          <span className="text-gray-600 mr-4">Welcome, User!</span>
          </div>
          <div className="w-15 h-15 bg-gray-800 rounded-full mr-6"></div>
        </div>

        {/* filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          {
           
            filterOptions.map((option) => ( <FilterComponent key={option.value} label={option.label} value={option.value} defActive={option.active} />))
           
          }
        
        </div>
      
        </div>
    </div>
  );
}

export default Home;
