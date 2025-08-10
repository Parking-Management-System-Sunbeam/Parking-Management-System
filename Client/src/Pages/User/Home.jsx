import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchComponent from "../../Components/SearchComponent";
import FilterComponent from "../../Components/FilterComponent";
import Listing from "../../Components/Listing";

import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";
function Home() {
  const [parkingData, setParkingData] = useState([]);

  const filterOptions = [
    { label: "All", value: "all", active: true },
    { label: "Cars", value: "cars" },
    { label: "Bikes", value: "bikes" },
    { label: "Trucks", value: "trucks" },
    { label: "Vans", value: "vans" },
    { label: "SUVs", value: "suvs" },
    { label: "Electric Vehicles", value: "electric" },
    { label: "Luxury Vehicles", value: "luxury" },
    { label: "Luxury Vehicles", value: "luxury" },
  ];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/locations/get/all`)
      .then((response) => {
        setParkingData(response.data);
        console.log("Fetched parking data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
            <span className="text-gray-600 mr-4">
              Welcome,{" "}
              {localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).userName
                : "Guest"}
            </span>
          </div>
          <div className="w-15 h-15 bg-gray-800 rounded-full mr-6">
            <img src={ 
                 JSON.parse(localStorage.getItem("user")).img
                 ? JSON.parse(localStorage.getItem("user")).img
                 : "https://via.placeholder.com/150" // Placeholder image if no user image is available
              } 
             
                 alt="User Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        {/* filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          {filterOptions.map((option) => (
            <FilterComponent
              key={option.value}
              label={option.label}
              value={option.value}
              defActive={option.active}
            />
          ))}
        </div>

        {/* cards */}

        <div className="flex flex-wrap gap-7 mb-8">
          {parkingData.map((option) => (
            <Listing key={option.id} data={option} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
