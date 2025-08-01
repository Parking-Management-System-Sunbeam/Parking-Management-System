import { Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Listing = ({ data }) => {
  console.log(data);
  const nav= useNavigate();

  const onDetails = () => {
    console.log("listing clicked");
    nav("/details");
  };
  return (
    <>
      <div
        onClick={onDetails}
        className="w-50 h-[300px]  overflow-hidden shadow-md flex flex-col   cursor-pointer  rounded-2xl "
      >
        <img
          src={data.image}
          className="w-full h-40 object-cover rounded-t-2xl  "
          alt="Sunbeam Parking"
        />
        <div className="px-4  text-[18px] mt-2  font-bold text-left text-[#ffbd59]">
          {data.name}
        </div>
        <div className="mt-1 space-y-1 text-left text-sm font-light px-4 ">
          <div className="flex justify-between text-gray-600">
            <div className=" flex-1 font-bold text-gray-800">Location </div>
            <div className=" flex-1">{data.location} </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <div className=" flex-1 font-bold text-gray-800">Vehicles </div>
            <div className=" flex-1">{data.vehicles} </div>
          </div>
          <div className="flex justify-between text-gray-600">
            
            <div className=" flex-1 font-bold text-gray-800">Rating </div>
            <div className=" flex space-x-2 gap-2 items-center flex-1">{data.rating} <Star width={18} fill="#ffbd59"     /> </div>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Listing;
