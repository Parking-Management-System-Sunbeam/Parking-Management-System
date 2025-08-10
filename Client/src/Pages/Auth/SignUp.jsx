import React, { useState } from 'react'
import ButtonComponent from '../../Components/ButtonComponent';
import TextInputCompnent from '../../Components/TextInputCompnent';

import parking from "../../assets/AuthImages/parking.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
const SignUp = () => {

  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, serPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

   const { signup, loading } = useAuth();

   const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name)
  }
   const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email)
  }
    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password)
  }
    const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    console.log(confirmPassword)
  }

  const handlePhoneChange = (e) => {
    serPhone(e.target.value);
    console.log(phone)
  }
   const handleSubmit = async () => {
    // Basic form validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const userData = {
      userName: name,
      email,
      password,
      phone
    };

    const result = await signup(userData);
    if (result.success) {
      nav('/login'); 
    }
  };

  return (
    <div>
          <div className="flex  flex-row justify-content-center">
            {/* image */}
            <img src={`${parking}`} alt="" className='flex-1/2 w-1/2  object-cover h-screen' />
            
            {/* SignUp */}
            <div className=' w-full p-14 border-dashed flex-1/2 bg-white shadow-lg h-screen flex flex-col space-y-9 '>
           {/* Headings */}
            <div className="space-y-2 mb-6">

                <h2 className=' text-4xl  font-bold font-monospace'>Account Sign Up</h2>
                <p className='text-gray-500'>Become a member and enjoy  exclusive promotions.</p>
          
            </div>
          <div className='mt-5 mb-11'>

            {/* Form fields */}
            <div className='flex flex-col space-y-7 '>
             <div className='grid grid-cols-2 gap-4'>

              <TextInputCompnent title='Full Name' isPassword={false} onChange={handleNameChange} />
              <TextInputCompnent title='Phone Number' isPassword={false} onChange={handlePhoneChange} />
             </div>
            
              <TextInputCompnent title='Email Address' isPassword={false} onChange={handleEmailChange} />
           <TextInputCompnent title='Password' isPassword={true} onChange={handlePasswordChange} />
           <TextInputCompnent title='Confirm Password' isPassword={true} onChange={handleConfirmPasswordChange} />
            </div>

          
          </div>

          {/* footer */}
          <div className='flex flex-col items-center space-y-4 '>
            <ButtonComponent  title='Sign Up' onPress={()=>{
             handleSubmit();
            }} />
            <p className='text-gray-500 text-center'>Already have an account? <Link to="/login" className='text-gray-800   font-bold hover:underline'>Sign In</Link></p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
