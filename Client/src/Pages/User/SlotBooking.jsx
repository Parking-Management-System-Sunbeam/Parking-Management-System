import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SlotDetailCard from "../../Components/SlotDetailCard";

const SlotBooking = () => {
  const dummySlots = [
    {
      slotId: "SLOT-001",
      slotName: "A1",
      vehicleType: "Car",
      status: "Available",
    },
    {
      slotId: "SLOT-002",
      slotName: "A2",
      vehicleType: "Car",
      status: "Occupied",
    },
    {
      slotId: "SLOT-003",
      slotName: "B1",
      vehicleType: "Bike",
      status: "Available",
    },
    {
      slotId: "SLOT-004",
      slotName: "C1",
      vehicleType: "Car",
      status: "Available",
    },
    {
      slotId: "SLOT-005",
      slotName: "VIP-1",
      vehicleType: "Car",
      status: "Reserved",
    },
  ];
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSelect = (id) => {
    setSelectedSlots((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex">
      <div className=" flex-1/6">
        <Sidebar />
      </div>
      <div className="flex-4/5 p-4 mt-8 ">
        <div className="m-6 p-6 w-full flex flex-col items-center overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">Available Parking Slots</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-6xl">
            {dummySlots.map((slot) => (
              <SlotDetailCard
                key={slot.slotId}
                slot={slot}
                isSelected={selectedSlots.includes(slot.slotId)}
                toggleSelect={toggleSelect}
              />
            ))}
          </div>

          {selectedSlots.length > 0 && (
            <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Book Slot
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
