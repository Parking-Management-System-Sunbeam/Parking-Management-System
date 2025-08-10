import React from "react";
import Sidebar from "../../components/Sidebar";
import SearchComponent from "../../Components/SearchComponent";
import FilterComponent from "../../Components/FilterComponent";
import Listing from "../../Components/Listing";

import sunbeamParking from "../../assets/ParkingImages/parking.jpg"
import { useNavigate } from "react-router-dom";
function Home() {
const Navigate = useNavigate();
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


  const parkingData = [
    { id: 1, name: " Parking", location: "Mumbai, MH", vehicles: "Cars", rating: 4.5, image: sunbeamParking },
    { id: 2, name: "Sunbeam Parking", location: "Pune, MH", vehicles: "Bikes", rating: 4.0, image: sunbeamParking },
    { id: 3, name: "Sunbeam Parking", location: "Bangalore", vehicles: "Trucks", rating: 4.2, image: sunbeamParking },
    { id: 4, name: "Sunbeam Parking", location: "Delhi, Union", vehicles: "Vans", rating: 4.8, image: sunbeamParking },
    { id: 5, name: "Sunbeam Parking", location: "Chennai", vehicles: "SUVs", rating: 4.6, image: sunbeamParking },
    { id: 6, name: "Sunbeam Parking", location: "Hyderabad", vehicles: "Electric Vehicles", rating: 4.3, image: sunbeamParking },
    { id: 7, name: "Sunbeam Parking", location: "Kolkata", vehicles: "Luxury Vehicles", rating: 4.9, image: sunbeamParking },
  { id: 10, name: "Sunbeam Parking", location: "Lucknow, UP", vehicles: "Luxury Vehicles", rating: 4.1, image: sunbeamParking }
  ];
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
          <span className="text-gray-600 mr-4">Welcome,{" "}
            
            {

              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).userName
                : "Guest"
            }

          </span>
          </div>
          <div
  onClick={() => Navigate("/profile")}
  className="w-15 h-15 bg-gray-800 rounded-full mr-6 cursor-pointer"
>
  <img
    src={
      JSON.parse(localStorage.getItem("user")).img
        ? JSON.parse(localStorage.getItem("user")).img
        : "https://via.placeholder.com/150"
    }
    alt="User Avatar"
    className="w-full h-full object-cover rounded-full"
  />
</div>

        </div>

        {/* filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          {
           
            filterOptions.map((option) => ( <FilterComponent key={option.value}  label={option.label} value={option.value} defActive={option.active} />))
           
          }
        
        </div>

        {/* cards */}

             <div className="flex flex-wrap gap-7 mb-8">
          {
           
            parkingData.map((option) => ( <Listing key={option.value} data={option} />))
           
          }
        
        </div>

      
        </div>
    </div>
  );
}

export default Home;
