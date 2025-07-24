
import React from 'react'
import Sidebar from '../../components/Sidebar'

const Bookings = () => {
  return (
     <div className="flex">
      <div className=" flex-1/6">

      <Sidebar />
      </div>
      <div className="flex-4/5 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        </div>
    </div>
  )
}

export default Bookings
