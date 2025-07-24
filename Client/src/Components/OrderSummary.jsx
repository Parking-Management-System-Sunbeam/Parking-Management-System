import React from 'react';
// import bookedImg from '../assets/ParkingImages/sunbeamParking.jpg';
import metro from "../assets/ParkingImages/metro.webp"
const OrderSummary = () => {
  return (
    <div className="w-full max-w-sm bg-white  rounded-lg overflow-hidden p-4 ">
      <img
        src={metro}
        alt="Booked Parking"
        className="w-full h-48 object-cover rounded-md"
      />

<div className="mt-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Summary</h2>
  <div className="space-y-1 text-gray-600 text-sm">
    {[
      { label: 'Order ID', value: '121' },
      { label: 'Capacity Booked', value: '2' },
      { label: 'Date', value: '19/07/2025' },
      { label: 'Parking N.o', value: '19,21' },
      { label: 'Slot', value: '13:00-14:00 IST' },
      { label: 'Total Payment', value: '₹100' },
    ].map((item, index) => (
      <div className="flex gap-2" key={index}>
        <span className="w-36 font-medium text-gray-700">{item.label}:</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default OrderSummary;
