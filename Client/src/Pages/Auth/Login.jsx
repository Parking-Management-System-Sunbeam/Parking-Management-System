import React, { useState } from 'react'
import parking from "../../assets/AuthImages/parking.jpg"
import TextInputCompnent from '../../Components/TextInputCompnent'
import ButtonComponent from '../../Components/ButtonComponent';
const Login = () => {
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email)
  }
    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password)
  }

  return (
    <div className=' '>
        <div className="flex  flex-row justify-content-center">
            {/* image */}
            <img src={`${parking}`} alt="" className='flex-1/2 w-1/2  object-cover h-screen' />
            
            {/* Signin */}
            <div className=' w-full p-14 border-dashed flex-1/2 bg-white shadow-lg h-screen flex flex-col space-y-9 '>
           {/* Headings */}
            <div className="space-y-2 mb-6">

                <h2 className=' text-4xl  font-bold font-monospace'>Account Signin</h2>
                <p className='text-gray-500'>Become a member and enjoy  exclusive promotions.</p>
          
            </div>
          <div className='mt-5 mb-11'>

            {/* Form fields */}
            <div className='flex flex-col space-y-7 '>
             
              <TextInputCompnent title='Email Address' isPassword={false} onChange={handleEmailChange} />
           <TextInputCompnent title='Password' isPassword={true} onChange={handlePasswordChange} />
            </div>

            {/* firget pass */}
            <div className='text-right my-4'>
                <a href="/forget-password" className='text-gray-500 hover:underline'>Forget Password?</a>
                </div>
          </div>

          {/* footer */}
          <div className='flex flex-col items-center space-y-4 '>
            <ButtonComponent  title='Sign In' onPress={()=>{}} />
            <p className='text-gray-500 text-center'>Don't have an account? <a href="/signup" className='text-gray-800   font-bold hover:underline'>Sign Up</a></p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login
