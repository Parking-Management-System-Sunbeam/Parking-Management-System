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
      <div onClick={onDetails} className='w-50 h-[300px]  rounded-lg overflow-hidden shadow-md flex flex-col items-center p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform' >
      <img src={sunbeamParking} className='w-full h-40 object-cover rounded-2xl ' alt="Sunbeam Parking" />
      <div className='ml-1 mt-2 text-left  font-medium'>Name: Sunbeam Parking</div>
      <div className='mt-2  text-left text-sm font-light'>
      <div ><b className='mr-10.5'>Price</b>: ₹40/hr</div>
      <div> <b className='mr-4.75'>Location</b>: Hinjewadi, Pune</div>
      <div> <b className='mr-1.25'>Availability</b>: Open 24x7</div>
      <div><b className='mr-8.5'>Status</b>: Available</div>
      </div>
      
      </div>
          </>
  )
}

export default Listing

