import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HoUFKK8GOwFHUeJoXmWJgcGPfyLitqW9gzahgjG3bg1O2TnyLKlkb91vNDHB0vsVjh2N5mCUfvUN4xC7ckt2YSC00yJOEquYU';

  const onToken = (token) => {
    console.log(token);
    alert('Payment successful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Crwn Clothig Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
