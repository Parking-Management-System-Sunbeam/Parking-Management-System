import React from "react";
import {
  Clock,
  MapPin,
  CarFront,
  ArrowUpRight,
  ArrowRightCircle,
} from "lucide-react";

const MyBookComponent = ({
  day,
  date,
  month,
  vehicleType,
  location,
  time,
  status,
}) => {
  return (
    <div className="flex items-center  bg-[#ffbd59] rounded-2xl p-4 w-full max-w-5xl shadow-sm">
      {/* Left Date Section */}
      <div className="text-center px-4">
        <div className="text-xs text-white">{day}</div>
        <div className="text-4xl font-bold text-[#fff]">{date}</div>
        <div className="text-xs text-white">{month}</div>
      </div>

      {/* Middle Info Section */}
      <div className="flex justify-between items-center bg-white rounded-xl px-6 py-4 flex-1 mx-2">
        {/* Vehicle Type */}
        <div className="flex  flex-col  items-center gap-2 text-gray-600">
          <CarFront size={18} />
          <p>{vehicleType}</p>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Clock size={18} />
          <span>{time}</span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2  text-gray-600">
          <span
            className={`text-xs text-white  py-2 px-5 rounded-2xl font-semibold ${
              status == "UPCOMING"
                ? "bg-green-500"
                : status == "ONGOING"
                ? "bg-blue-500"
                : "bg-red-500"
            }`}
          >
            {status}
          </span>
        </div>

        {/* View Details */}
        <div className="text-gray-600 font-medium hover:underline cursor-pointer">
          <ArrowRightCircle size={22} />
        </div>
      </div>
    </div>
  );
};

export default MyBookComponent;
