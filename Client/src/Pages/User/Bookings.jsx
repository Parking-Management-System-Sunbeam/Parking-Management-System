import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import MyBookComponent from "../../Components/MyBookComponent";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";

const Bookings = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/bookings/getbyuserid/${user.id}`)
      .then((response) => {
        const formattedHistory = response.data.map((booking) => {
          const start = new Date(booking.startTime);
          const end = new Date(booking.endTime);
          const now = new Date();

          var statusLabel = "DONE"; // default
          if (now >= start && now <= end) {
            statusLabel = "ONGOING";
          } else if (now < start) {
            statusLabel = "UPCOMING";
          }

          return {
            day: start
              .toLocaleDateString("en-US", { weekday: "long" })
              .toUpperCase(),
            date: start.getDate().toString().padStart(2, "0"),
            month: start
              .toLocaleDateString("en-US", { month: "long" })
              .toUpperCase(),
            vehicleType: booking.vehicleType || "N/A", // fallback if API doesn't have it
            location: booking.locationName,
            time: `${start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
            status: statusLabel,
          };
        });

        setHistory(formattedHistory);
      })
      .catch((error) => {
        console.error("Error fetching booking history:", error);
      });
  }, []);

  return (
    <div className="flex">
      <div className=" flex-1/6">
        <Sidebar />
      </div>
      <div className="flex-4/5 p-4 mt-8 ">
        {/* search header */}
        <div className="flex justify-between items-center mb-6  mx-2">
          <h1 className="flex-1/2 text-2xl font-bold   text-center    ">
            History of bookings
          </h1>
          <div className="flex  items-center ">
            <span className="text-white mr-2 ">
              Welcome, {user?.name || "User"}!
            </span>
          </div>
          <div className="w-15 h-15 bg-white rounded-full mr-6"></div>
        </div>

        <div className="flex flex-col gap-10">
          {history.length > 0 ? (
            history.map((item, index) => (
              <MyBookComponent
                key={index}
                day={item.day}
                date={item.date}
                month={item.month}
                vehicleType={item.vehicleType}
                location={item.location}
                time={item.time}
                status={item.status}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No booking history found.
            </p>
          )}
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Bookings;
