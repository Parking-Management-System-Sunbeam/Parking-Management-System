import React from 'react'
import parking from "../../assets/AuthImages/parking.jpg"
const Login = () => {
  return (
    <div className=' '>
        <div className="flex  flex-row justify-content-center">
            {/* image */}
            <img src={`${parking}`} alt="" className='flex-1/2 w-1/2  object-cover h-screen' />
            
            {/* Signin */}
            <div className=' w-full p-8  bg-emerald-300 border-dashed flex-1/2'>
                <h2 className=' te font-monospace'>Account Sigin</h2>
            </div>
        </div>
    </div>
  )
}

export default Login
