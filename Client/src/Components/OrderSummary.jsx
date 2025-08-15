import React from "react";
// import bookedImg from '../assets/ParkingImages/sunbeamParking.jpg';
import metro from "../assets/ParkingImages/metro.webp";
const OrderSummary = ({ locState, locData }) => {
  console.log("OrderSummary locState:", locState);
  return (
    <div className="w-full max-w-sm bg-white  rounded-lg overflow-hidden p-4 ">
      <img
        src={locData?.image || metro}
        alt="Booked Parking"
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Order Summary
        </h2>
        <div className="space-y-1 text-gray-600 text-sm">
          {[
            { label: "Capacity Booked", value: "1" },
            {
              label: "Date",
              value: locState.startTime.split("T")[0] || "19/07/2025",
            },
            {
              label: "Start Time",
              value: locState.startTime.split("T")[1] || "00:00:00",
            },
            {
              label: "End Time",
              value: locState.endTime.split("T")[1] || "00:00:00",
            },
            { label: "Parking Name", value: locData.location_name || "N/A" },
            { label: "Slot Name", value: locState.slotName || "N/A" },
            { label: "Total Payment", value: "₹" + locData.price || "₹0" },
          ].map((item, index) => (
            <div className="flex gap-2" key={index}>
              <span className="w-36 font-medium text-gray-700">
                {item.label}:
              </span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
