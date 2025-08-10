import { Star } from "lucide-react";
import React from "react";


const Listing = ({ data }) => {
  console.log(data);
 


  return (
    <>
       <div
     
        className="w-50 h-[300px]  overflow-hidden shadow-md flex flex-col   cursor-pointer  rounded-2xl "
      >
      <img
  src={
    data.image
      ? data.image
      : "https://via.placeholder.com/400x200.png?text=No+Image+Available"
  }
  className="w-full h-40 object-cover rounded-t-2xl"
  alt={data.location_name || "Parking Location"}
/>
        <div className="px-4  text-[18px] mt-2  font-bold text-left text-[#ffbd59]">
          {data.location_name}
        </div>
        <div className="mt-1 space-y-1 text-left text-sm font-light px-4 ">
          <div className="flex justify-between text-gray-600">
            <div className=" flex-1 font-bold text-gray-800">Location </div>
            <div className=" flex-1">{data.location_name} </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <div className=" flex-1 font-bold text-gray-800">Pincode </div>
            <div className=" flex-1">{data.pincode} </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <div className=" flex-1 font-bold text-gray-800">Rating </div>
            <div className=" flex space-x-2 gap-2 items-center flex-1">
{data.avgRating} <Star width={18} fill="#ffbd59"     /> </div>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Listing;
