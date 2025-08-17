
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchComponent from "../../Components/SearchComponent";
import Listing from "../../Components/Listing";
import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";
import { useNavigate } from "react-router-dom";
import img from "../../assets/profileImage.jpg";

function Home() {
  const [parkingData, setParkingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const nav = useNavigate();

  // Search handler
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setFilteredData(parkingData); // reset if empty
      return;
    }

    const filtered = parkingData.filter((item) => {
      const nameMatch = item.location_name.toLowerCase().includes(lowerQuery);
      const pincodeMatch = item.pincode.toString().includes(lowerQuery);
      return nameMatch || pincodeMatch;
    });

    setFilteredData(filtered);
  };

  // Fetch parking locations
  useEffect(() => {
    axios
      .get(`${BASE_URL}/locations/get/all`)
      .then((response) => {
        setParkingData(response.data);
        setFilteredData(response.data); // initialize filtered data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="flex-1/6">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-4/5 p-4 mt-9">
        {/* Search and profile */}
        <div className="flex justify-between items-center mb-6">
          <SearchComponent onSearch={handleSearch} />
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">
              Welcome,{" "}
              {localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).userName
                : "Guest"}
            </span>
          </div>
          <div
            onClick={() => nav("/profile")}
            className="w-15 h-15 bg-gray-800 rounded-full mr-6"
          >
            <img
              src={img}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Parking listings */}
        <div className="flex flex-wrap gap-7 mb-8">
          {filteredData.length > 0 ? (
            filteredData.map((option) => (
              <Listing key={option.id} data={option} />
            ))
          ) : (
            <p>No locations found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

