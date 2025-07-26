import { Bike, Car } from "lucide-react";
import React from "react";

const SlotDetailCard = ({ slot, isSelected, toggleSelect }) => {
  const isDisabled = slot.status !== "Available";

  return (
    <div
      onClick={() => {
        if (!isDisabled) toggleSelect(slot.slotId);
      }}
      className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md cursor-pointer transition duration-200 ${
        isDisabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : isSelected
          ? "bg-green-500 text-white"
          : "bg-white hover:bg-green-100"
      }`}
    >
      {slot.vehicleType === "Car" && <Car className="w-8 h-8 mb-2" />}
      {slot.vehicleType === "Bike" && <Bike className="w-8 h-8 mb-2" />}
      {slot.vehicleType !== "Car" && slot.vehicleType !== "Bike" && (
        <div className="text-sm mb-2">🚗</div>
      )}
      <span className="font-semibold">{slot.slotName}</span>
    </div>
  );
};

export default SlotDetailCard;
