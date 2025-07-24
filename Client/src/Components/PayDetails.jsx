import React from 'react'
import TextInputCompnent from './TextInputCompnent'
import ButtonComponent from './ButtonComponent'
const PayDetails = () => {
  return (
    <div>
      <div className="w-full justify-center items-center">
        <div className="w-full max-w-7xl p-8  rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-center">Payment Details</h2>

          <div className="space-y-5">
            <TextInputCompnent title="Card Number" />
            <TextInputCompnent title="Branch" />


            <div className="flex space-x-4">
              <TextInputCompnent title="Expiry Date" />
              <TextInputCompnent title="CVV" />
            </div>

            <TextInputCompnent title="Card Holder Name" />
          </div>
          <div className='flex justify-center mt-6'>
      <ButtonComponent title='Pay' />
      </div>
        </div>
        
      </div>
    </div>
    
  )
}

export default PayDetails
