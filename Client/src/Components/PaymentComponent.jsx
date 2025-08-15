import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent';

const PaymentComponent = () => {
  const[method, setMethod] = useState("card");
  const[details, setDetails] = useState({
    name :' ',
    cardNumber :' ',
    expiry :' ',
    cvv :' ',
    branch :' ',
    upiId: ' '
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Selected method:", method);
    console.log("Payment details:", details);

    // Later here you can call your Razorpay function or backend
  };
  return (
    <div className=''>
    <div className='mr-4' style={{ padding: "2rem", maxWidth: "500px", margin: "auto", borderRadius: "10px" }}>
      <h2>Secure Payment</h2>

      <div>
        <label><input type="radio" value="card" checked={method === 'card'} onChange={(e) => setMethod(e.target.value)} /> Card</label><br />
        <label><input type="radio" value="upi" checked={method === 'upi'} onChange={(e) => setMethod(e.target.value)} /> UPI (GPay, PhonePe)</label><br />
        <label><input type="radio" value="wallet" checked={method === 'wallet'} onChange={(e) => setMethod(e.target.value)} /> Wallet (Paytm, etc)</label>
      </div>

      <form onSubmit={handlePayment} style={{ marginTop: "1rem" }}>
     

        {method === 'upi' && (
          <>
            <input name="upiId" placeholder="Enter your UPI ID" onChange={handleChange} required /><br /><br />
          </>
        )}

        {method === 'wallet' && (
          <>
            <p>You'll be redirected to your wallet app after clicking Pay Now.</p>
          </>
        )}

        {/* <button type="submit">Pay Now</button> */}
        <div className='mt-3 '>
        <ButtonComponent title='Pay'/>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PaymentComponent;