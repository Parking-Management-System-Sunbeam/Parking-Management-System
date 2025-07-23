import React from 'react'
import { useState } from 'react'
import sunbeamParking from "../assets/ParkingImages/sunbeamParking.jpg"
const Listing = () => {
  const[component, setComponent] = useState("");
  const onDetails=()=>{
    console.log("listing clicked",component);
    //listing logic 
  }
  return (
    
    <>
      <div onClick={onDetails} className='w-48 h-[300px]  rounded-lg overflow-hidden shadow-md flex flex-col items-center p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform' >
      <img src={sunbeamParking} className='w-full h-40 object-cover' alt="Sunbeam Parking" />
      <div className='mt-2 text-center text-sm font-semibold'>Name: Sunbeam Parking
      <div >Price: ₹40/hr</div>
      <div> Location: Hinjewadi, Pune</div>
      <div>Availability: Open 24x7</div>
      <div>Status: Available</div>
         </div>
      
      </div>
          </>
  )
}

export default Listing

