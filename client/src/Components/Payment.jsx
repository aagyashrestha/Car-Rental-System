import React from 'react';
import PayPalLogo from '../assets/paypal.jpg'; // Import PayPal logo image

function PaymentPage() { 
 

  

 
    return (
      <div>
        <h1>Payment Page</h1>
        <img src={PayPalLogo} alt="PayPal Logo" width="100" height="50" />
        <button onClick={this.handlePayClick}>Pay with PayPal</button>
      </div>
    );
  }

export default PaymentPage;
