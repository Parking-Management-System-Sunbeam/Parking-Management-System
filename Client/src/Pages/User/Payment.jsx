import React from 'react';
import TextInputCompnent from '../../Components/TextInputCompnent';
import Sidebar from '../../components/Sidebar';
import OrderSummary from '../../Components/OrderSummary';
import PaymentComponent from '../../Components/PaymentComponent';
import PayDetails from '../../Components/PayDetails';

const Payment = () => {
  return (
    <div className="flex min-h-screen">
      
      <div className="w-1/5 ">
        <Sidebar />
      </div>

      <div className="w-3/5 flex flex-col items-center justify-start py-10">
        <PayDetails />
      </div>

      <div className="w-1/5  px-4 py-10 space-y-6">
        <OrderSummary />
        <PaymentComponent />
      </div>
    </div>
  );
};

export default Payment;
