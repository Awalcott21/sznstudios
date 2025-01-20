import React, { useEffect } from 'react';

const PayPalButton: React.FC = () => {
  useEffect(() => {
    // Ensure PayPal SDK is available
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '60.00', // Set your product price here
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      }).render('#paypal-button-container'); // Render buttons into this div
    }
  }, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalButton;
