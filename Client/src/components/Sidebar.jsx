
import logo from '../assets/Parkit.png'; 
import {Link} from "react-router-dom"
const Sidebar = () => {
  return (
       <>     
        <div className="flex flex-col justify-between h-screen sticky top-0 w-full items-center">
        <div className='p-5'>
          <div className="text-center ">
            <img src={logo} alt="Logo" className="w-full " />
          </div>

          <div className=" flex flex-col space-y-4  font-medium   px-11 ">
            <Link to="/home" className="hover:text-gray-800 transition ">
              Home
            </Link>
            <Link to="/booking" className="hover:text-gray-800 transition ">
              My Bookings
            </Link>
            <Link to="/about-us" className="hover:text-gray-800 transition ">
              About Us
            </Link>
            
          </div>
        </div>
        <div className='mb-8  w-full   p-5 '>
          <Link to="/" className="text-red-600 px-11 hover:text-red-800 font-medium transition">
            Logout
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
