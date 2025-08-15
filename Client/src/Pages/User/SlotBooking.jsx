import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar"; // Adjust path if needed
import { useLocation, useNavigate } from "react-router-dom";
import Bookings from "./Bookings";
import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";

const SlotBooking = () => {
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [slotsData, setSlotsData] = useState([]);

  const location = useLocation();

  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setStartTime("");
    setEndTime("");
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime("");
  };

  const isEndTimeValid = () => {
    if (!startTime || !endTime) return true;
    return endTime > startTime;
  };

  const isFormValid = () => {
    return date && startTime && endTime && isEndTimeValid();
  };

  const formatDateTime = (dateStr, timeStr) => {
    // Merge date + time → "YYYY-MM-DDTHH:mm:ss"
    // const dateTime = new Date(`${dateStr}T${timeStr}`);
    return `${dateStr}T${timeStr}:00`;
  };
  useEffect(() => {
    if (isFormValid()) {
      fetchSlots();
      setSelectedSlot("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, startTime, endTime]);

  const fetchSlots = async () => {
    const reqBody = {
      locationId: location.state.locid,
      startTime: formatDateTime(date, startTime),
      endTime: formatDateTime(date, endTime),
    };

    console.log("Fetching slots with:", reqBody);
    try {
      const res = await axios.post(
        `${BASE_URL}/bookings/available-slots`,
        reqBody
      );
      console.log("Available Slots Response:", res.data);
      setSlotsData(res.data);
      setShowSlots(true);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleBookSlot = () => {
    if (isFormValid()) {
      fetchSlots();
    }
  };
  const handleConfirmBooking = () => {
    //   console.log("Booking Details:");
    // console.log("Location ID:", location.state.locid);
    // console.log("Slot ID:", selectedSlot.id);
    // console.log("Start Time:", startTime);
    // console.log("End Time:", endTime);
    // console.log("Date:", date);
    navigate("/payment", {
      state: {
        locid: location.state.locid,
        slotId: selectedSlot.id,
        slotName: selectedSlot.slotName,
        startTime: formatDateTime(date, startTime),
        endTime: formatDateTime(date, endTime),
      },
    });
  };

  useEffect(() => {
    // You can fetch slot data based on the location state if needed
    console.log("Location state:", location.state);
  }, []);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - 1/5 width */}
      <div className="w-1/5 ">
        <Sidebar />
      </div>

      {/* Main Content - 4/5 width */}
      <div className="w-4/5 p-8 bg-white">
        <div className="max-w-4xl mx-auto p-6 shadow-md bg-white rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Select Booking Time</h2>

          <div>
            <label className="block text-lg font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={handleDateChange}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              disabled={!date}
              className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300 ${
                !date && "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <div>
              <label className="block text-lg font-medium mb-2">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={!startTime}
                className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300 ${
                  !startTime && "bg-gray-100 cursor-not-allowed"
                }`}
              />
              {!isEndTimeValid() && (
                <p className="text-red-500 text-sm mt-1">
                  End time must be later than start time
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleBookSlot}
            disabled={!isFormValid()}
            className={`mt-4 px-4 py-2 rounded text-white ${
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Book Slot
          </button>

          {showSlots && (
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Available Slots</h3>

              {/* <div className="grid grid-cols-5 gap-4 font-semibold mb-2 text-center">
                <div></div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
              </div> */}

              {/* slot */}
              {/* {Object.entries(slotLayout).map(([rowLabel, rowSlots]) => (
                <div key={rowLabel} className="grid grid-cols-5 gap-4 mb-2">
                  <div className="flex items-center justify-center font-semibold">
                    {rowLabel}
                  </div>
                  {rowSlots.map((slot) => {
                    const slotInfo = getSlotInfo(slot);
                    const isAvailable = slotInfo?.available;
                    return (
                      <button
                        key={slot}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            console.log(`Selected slot: ${slot}`);
                            setSelectedSlot(slot);
                          }
                        }}
                        className={`rounded-full w-16 h-16 text-center flex items-center justify-center border-2 transition
                          ${
                            !slotInfo
                              ? "bg-gray-200"
                              : isAvailable
                              ? selectedSlot === slot
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-black hover:bg-green-200"
                              : "bg-red-500 text-white cursor-not-allowed"
                          }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              ))} */}
              <div className="grid grid-cols-4 gap-4">
                {slotsData.map((slot, index) => {
                  const isAvailable = slot.available;
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <button
                      key={slot.id}
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedSlot(slot);
                        }
                      }}
                      className={`rounded-lg h-16 flex items-center justify-center font-semibold border-2 transition
              ${
                isAvailable
                  ? isSelected
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-200 text-black hover:bg-green-200"
                  : "bg-red-500 text-white cursor-not-allowed border-red-600"
              }`}
                    >
                      {`slot_${index + 1}`}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className={`mt-6 px-4 py-2 rounded text-white ${
                  selectedSlot
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
