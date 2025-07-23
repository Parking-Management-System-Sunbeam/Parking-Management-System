import React, { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react';
const TextInputCompnent = ({title='text',isPassword, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className='flex flex-col '>
        <h2 className=' text-xl  font-bold font-monospace mb-2'>{title}</h2>

          <div className="relative ">
             <input
             onChange={onChange}
             type={!showPassword ? 'text' : 'password'}
             placeholder= {"Enter "+ title}
             className="w-full p-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 "
             />
     { isPassword && (
         <button
         type="button"
        onClick={togglePassword}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
        >
        {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>)}
          </div>    
           </div>
  )
}

export default TextInputCompnent
