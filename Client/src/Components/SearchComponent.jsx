import React from 'react'
import { useState } from 'react'
import { Search } from 'lucide-react';
const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const handleSearchClick=()=>{
    
    console.log("searching here",query)

    //search logic
  }
  return (
    <div className="relative max-w-lg  w-full mx-auto  ">
      <label htmlFor='search' className='block mb-2 font-medium text-gray-700'></label> 
     <div className='relative'>
      <input id='search' type='text' value={query} onChange={e=> setQuery(e.target.value)} placeholder='Search location' className=' w-full py-2 px-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 bg-gray-50'/>
      <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ffbd59] transition-colors duration-200"
        >
          <Search size={18} />
        </button>
        </div>
    </div>
  )
}

export default SearchComponent
