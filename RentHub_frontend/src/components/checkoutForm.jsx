import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const selectedObject = props.selectedObject

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(sessionStorage.getItem("objeto"))
    console.log(sessionStorage.getItem("tiempo_arrendamiento"))
    console.log(sessionStorage.getItem("unidad_arrendamiento"))

    if (!stripe || !elements) {
      return;
    }

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
    } else {
      const response = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeEmail: 'carolain3472@gmail.com', // Puedes obtenerlo del usuario
          stripeToken: token.id,
          monto: 40000,
          nombre: 'Alexander Tamayo',
          usuario:1,
          arrendamiento: 5
        }),
      });

      if (response.ok) {
        console.log('Pago exitoso');
      } else {
        console.error('Error en el pago');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
}
