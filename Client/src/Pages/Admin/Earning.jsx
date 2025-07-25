import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar';
 import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
function Earning() {
   

const monthlyEarnings = [
  { month: 'Jan', earnings: 12000 },
  { month: 'Feb', earnings: 15000 },
  { month: 'Mar', earnings: 17000 },
  { month: 'Apr', earnings: 14000 },
  { month: 'May', earnings: 18000 },
  { month: 'Jun', earnings: 20000 },
  { month: 'Jul', earnings: 19000 },
  { month: 'Aug', earnings: 22000 },
  { month: 'Sep', earnings: 21000 },
  { month: 'Oct', earnings: 25000 },
  { month: 'Nov', earnings: 23000 },
  { month: 'Dec', earnings: 27000 },
];

  return (
    <>      
     <div className='flex '>
      <aside className="w-64">
        <AdminSidebar/>
      </aside>
       <div className='flex flex-col w-full'>
      <main className=" p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Earnings Overview</h1>
      </main>

   
    <div className="w-[80%] h-[50%] mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Total Earnings</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyEarnings} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </div>
    </>

  )
}

export default Earning