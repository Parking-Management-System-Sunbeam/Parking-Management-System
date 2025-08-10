import React, { useEffect, useState } from "react";
import TextInputCompnent from "../../Components/TextInputCompnent";
import Sidebar from "../../components/Sidebar";
import OrderSummary from "../../Components/OrderSummary";
import PaymentComponent from "../../Components/PaymentComponent";
import PayDetails from "../../Components/PayDetails";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";

const Payment = () => {
  const location = useLocation();

  const { locid } = location.state || {};

  const [locData, setLocData] = useState(null);

  const fetchData = async () => {
    axios
      .get(`${BASE_URL}/locations/get/${locid}`)
      .then((response) => {
        setLocData(response.data);
        console.log("Fetched location data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 ">
        <Sidebar />
      </div>

      <div className="w-2/5 flex flex-col items-center justify-start py-10">
        <PayDetails locData={locData} locState={location.state} />
      </div>

      <div className="w-2/5  px-4 py-10 space-y-6">
        {locData ? (
          <OrderSummary locData={locData} locState={location.state} />
        ) : (
          <div>Loading...</div>
        )}
        {/* <PaymentComponent /> */}
      </div>
    </div>
  );
};

export default Payment;
