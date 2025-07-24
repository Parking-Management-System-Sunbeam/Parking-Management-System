
import React from 'react'
import Sidebar from '../../components/Sidebar'
import MyBookComponent from '../../Components/MyBookComponent'

const Bookings = () => {

    const history = [
         {day : "SUNDAY",
         date : "31",
         month : "DECEMBER",    
         vehicleType : "Car",
         location : "Mumbai",
         time : "10:00 AM-12:00 PM",
         status : true
         },
         {day : "MONDAY",
            date : "1",
            month : "JANUARY",
            vehicleType : "Bike",
            location : "Pune",
            time : "2:00 PM-4:00 PM",
            status : false
            },
            {day : "TUESDAY",
            date : "2",
            month : "JANUARY",
            vehicleType : "Truck",
            location : "Delhi",
            time : "9:00 AM-11:00 AM",
            status : true
            }
    ];

         

  return (
     <div className="flex">
      <div className=" flex-1/6">

      <Sidebar />
      </div>
      <div className="flex-4/5 p-4 mt-8 ">
         {/* search header */}
      <div className="flex justify-between items-center mb-6  mx-2">

     
        <h1 className="flex-1/2 text-2xl font-bold   text-center    ">History of bookings</h1>
        <div className="flex  items-center ">
          <span className="text-white mr-2 ">Welcome, User!</span>
          </div>
          <div className="w-15 h-15 bg-white rounded-full mr-6"></div>
        </div>

        <div className="flex flex-col gap-10">

        {
            history.map((item, index) => (
                <MyBookComponent
                    key={index}
                    day={item.day}
                    date={item.date}
                    month={item.month}
                    vehicleType={item.vehicleType}
                    location={item.location}
                    time={item.time}
                    status={item.status}
                />
                ))
        }
        </div>
        </div>
        <div className='flex-1'></div>
    </div>
  )
}

export default Bookings
