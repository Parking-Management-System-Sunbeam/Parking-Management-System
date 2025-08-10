import React from "react";
import ButtonComponent from "./ButtonComponent";
import { MapPin, Phone, Clock, Star, CarFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SlotDetails = ({ value }) => {
  const nav = useNavigate();

  const bookNow = () => {
    nav("/slot-booking", {
      state: {
        locid: value.id,
      },
    });
  };
  return (
    <>
      <div className="p-6 flex flex-col justify-start overflow-hidden mt-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex justify-center h-[250px] w-2/5">
            <img
              src={value.image}
              alt="Image"
              className="w-auto h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="h-[250px] p-5 w-3/5 text-justify bg-gray-300 shadow-2xl rounded-md  md:w-1/2 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CarFront className="text-gray-600" size={24} />
              {value.location_name}
            </h2>

            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              {value.pincode}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={18} className="text-gray-500" />
              ----
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              All time
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Star size={18} className="text-yellow-500" />
              {value.avgRating} / 5
            </p>
          </div>
        </div>
        <div className="flex mt-5 mb-4 ml-6">
          <p className="text-2xl font-semibold">Details About vender : -</p>
        </div>
        <div className="p-5 text-justify bg-gray-300 shadow-2xl mt-2  border rounded-lg text-gray-700 space-y-2">
          <p>
            <strong>Total Slots:</strong> {value.slots.length}
          </p>
          <p>
            <strong>Available Slots:</strong> {4}
          </p>
          <p>
            <strong>Rate:</strong> ₹{value.price} per hour
          </p>
          <p>
            <strong>Description:</strong> {value.description}
          </p>
        </div>
        <div className="mt-4 p-4 flex justify-end">
          <ButtonComponent title="Book Now" onPress={bookNow} />
        </div>
      </div>
    </>
  );
};

export default SlotDetails;
