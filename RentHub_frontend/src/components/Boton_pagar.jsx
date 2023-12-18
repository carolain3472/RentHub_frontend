import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './checkoutForm';

const stripePromise = loadStripe('pk_test_51OMNnaKFOk7cqJRg8SOe25iI3OnSiyTEjlICIwMrISfsIrTxaSOcKpunCSc3KhwfbJZPw7MFxqPMVC0PT8Z3NiHM008lFaV5rn');

export function Boton_pagar() {
    const [monto, setMonto] = useState(7000); // Puedes ajustar según tus necesidades

  return (
    <div>
      <h1>Stripe Payment Demo</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm monto={monto} />
      </Elements>
    </div>
  );
}
