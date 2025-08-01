import React from "react";

import logo from "../assets/ParkingImages/dummyParkingImage.png";
import ButtonComponent from "./ButtonComponent";
import { MapPin, Phone, Clock, Star, CarFront } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SlotDetails = () => {

  const nav = useNavigate();

  const vendorData = {
    parkingName: "City Center Parking",
    location: "MG Road, Pune",
    totalSlots: 50,
    availableSlots: 18,
    ratePerHour: 25,
    rating: 4.2,
    openHours: "8:00 AM - 10:00 PM",
    phone: "+91-9876543210",
  };
  const bookNow = () => {
    nav("/payment")
  };
  return (
    <>
      <div className="p-6 flex flex-col justify-start overflow-hidden mt-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex justify-center h-[250px] w-2/5">
            <img
              src={logo}
              alt="Image"
              className="w-auto h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="h-[250px] p-5 w-3/5 text-justify bg-gray-300 shadow-2xl rounded-md  md:w-1/2 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CarFront className="text-gray-600" size={24} />
              {vendorData.parkingName}
            </h2>

            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              {vendorData.location}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={18} className="text-gray-500" />
              {vendorData.phone}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              {vendorData.openHours}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Star size={18} className="text-yellow-500" />
              {vendorData.rating} / 5
            </p>
          </div>
        </div>
        <div className="flex mt-5 mb-4 ml-6">
          <p className="text-2xl font-semibold">Details About vender : -</p>
        </div>
        <div className="p-5 text-justify bg-gray-300 shadow-2xl mt-2  border rounded-lg text-gray-700 space-y-2">
          <p>
            <strong>Total Slots:</strong> {vendorData.totalSlots}
          </p>
          <p>
            <strong>Available Slots:</strong> {vendorData.availableSlots}
          </p>
          <p>
            <strong>Rate:</strong> ₹{vendorData.ratePerHour} per hour
          </p>
          <p>
            <strong>Description:</strong> Safe and secure parking space located
            at the heart of Pune with easy access to shops and offices. Equipped
            with CCTV and security personnel.
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
