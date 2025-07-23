import React from 'react'
import { useState } from 'react'
const FilterComponent = () => {

  const[isActive, setActive] = new useState("");
  const handleFilter=()=>{
    console.log("filter according to location, vehicles",isActive);
    //filter logic location like mum , pune
    //vehicles like car specific, bike specific etc
    //ratings etc
  }
  return (
    <div>
      <div className='border-2 font-bold inline-block rounded-2xl py-1 px-2 m-1.5  cursor-pointer transition-all duration-200 hover:border-amber-500  ' onClick={handleFilter}>
      <label className='cursor-pointer' htmlFor=''>Location</label>
      </div>
    </div>
  )
}

export default FilterComponent
