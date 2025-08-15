import React from 'react'
import { useState } from 'react'
const FilterComponent = ({label, defActive=false}) => {

  const[isActive, setActive] = new useState(defActive);
  const handleFilter=()=>{
    console.log("filter according to location, vehicles",isActive);
    setActive(!isActive);
  }
  return (
    <div>
      <div className={` ${isActive ? 'border-[#ffbd59]  text-[#ffbd59] border-2' : 'border-gray-700  border-1' }  font-semibold inline-block rounded-2xl py-1 px-3   cursor-pointer transition-all duration-200 `} onClick={handleFilter}>
      <label className='cursor-pointer' htmlFor=''>{label}</label>
      </div>
    </div>
  )
}

export default FilterComponent
