import React from "react";
import Sidebar from "../../components/Sidebar";
import SlotDetails from "../../Components/SlotDetails";

const Details = () => {
  return (
    <>
      <div className="flex">
        <div className=" flex-1/6">
          <Sidebar />
        </div>
        <div className="flex-4/5 p-4">
          <SlotDetails />
        </div>
      </div>
    </>
  );
};

export default Details;
