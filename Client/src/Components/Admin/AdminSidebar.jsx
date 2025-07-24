// import React from 'react'

// function AdminSideBar() {
//   return (
//     <>
//      <h1 className='text-xl font-bold text-white text-center p-6'>Admin SideBar</h1>
//     <hr className='border-white-500   border-2' />
//     <ul className=' flex flex-col text-lg text-center font-semibold gap-4 aligin-center mt-[100px]'>
//       <li className='py-2 text-white  hover:bg-gray-200 hover:text-black rounded-md'><a href='#'>Dashboard</a></li>
      
//       <li className='py-2 text-white  hover:bg-gray-200 hover:text-black rounded-md'><a href='#'>Add Place</a></li>
//       <li className='py-2 text-white  hover:bg-gray-200 hover:text-black rounded-md'><a href='#'>Edit Place</a></li> 
//       <li className='py-2 text-white  hover:bg-gray-200 hover:text-black rounded-md'><a href='#'>Insights</a></li>
//       <li className='py-2 text-white  hover:bg-gray-200 hover:text-black rounded-md'><a href='#'>Logout</a></li>
//     </ul>
//     </>
//   )
// }

// export default AdminSideBar

import React from 'react'
import logo from '../../assets/Parkit.png';
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div>
      <>
       <div className="flex flex-col justify-between  h-screen w-full items-center">
        <div className='p-5'>
          <div className="text-center ">
            <img src={logo} alt="Logo" className="w-full " />
          </div>

          <div className=" flex flex-col space-y-4  font-medium p-11  ">
            <Link to="/dashboard" className="hover:text-gray-800 transition ">
             Dashboard
            </Link>
            <Link to="/add-place" className="hover:text-gray-800 transition ">
              Add Place
            </Link>
            <Link to="/edit-place" className="hover:text-gray-800 transition ">
              Edit place
            </Link>
            <Link to="/earning" className="hover:text-gray-800 transition ">
              Earnings
            </Link>
            
          </div>
        </div>
        <div className='mb-8 '>
          <Link to="/login" className="text-red-600 hover:text-red-800 font-medium transition">
            Logout
          </Link>
        </div>
      </div>
      </>
    </div>
  )
}

export default AdminSidebar