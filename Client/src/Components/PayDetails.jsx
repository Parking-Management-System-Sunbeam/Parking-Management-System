import React, { useState } from "react";
import TextInputCompnent from "./TextInputCompnent";
import ButtonComponent from "./ButtonComponent";
import axios from "axios";
import { BASE_URL } from "../Utils/Helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const PayDetails = ({ locData, locState }) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [upiMode, setUpiMode] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();
  const handleLicenceChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleUpiChange = (e) => {
    setUpiMode(e.target.value);
  };
  const handleClick = async () => {
    if (!licenseNumber || !upiMode) {
      toast.error("Please fill in all payment details.");
      return;
    }
    const reqBody = {
      userId: user.id,
      slotId: locState.slotId,
      locationId: locData.id,
      startTime: locState.startTime,
      endTime: locState.endTime,
      licenseNumber: licenseNumber,
      payment: {
        amount: locData.price,
        paymentMode: upiMode,
      },
    };

    try {
      const res = await axios.post(`${BASE_URL}/bookings/add`, reqBody);
      console.log("Booking response:", res.data);

      toast.success("Payment successful! Booking confirmed.");
      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-full justify-center items-center">
        <div className="w-full max-w-7xl p-8  rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Payment Details
          </h2>

          <div className="space-y-5">
            <TextInputCompnent
              title="Vehicle Number"
              isPassword={false}
              onChange={handleLicenceChange}
            />
            <TextInputCompnent
              title="UPI mode"
              isPassword={false}
              onChange={handleUpiChange}
            />

            <ButtonComponent title="Pay" onPress={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayDetails;
