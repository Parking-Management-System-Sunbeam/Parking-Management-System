import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SlotDetails from "../../Components/SlotDetails";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/Helper";

const Details = () => {
  const location = useLocation();

  const [data, setData] = useState(null);
  const fetch = async () => {
    const id = location.state?.id;
    await axios
      .get(`${BASE_URL}/locations/get/${id}`)
      .then((response) => {
        setData(response.data);
        console.log("Fetched slot details:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching slot details:", error);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div className="flex">
        <div className=" flex-1/6">
          <Sidebar />
        </div>
        <div className="flex-4/5 p-4">
          {data ? <SlotDetails value={data} /> : <div>Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Details;
