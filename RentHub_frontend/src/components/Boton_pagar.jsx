import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { StripeCheckoutForm } from './checkoutForm';

const stripePromise = loadStripe('pk_test_51OMNnaKFOk7cqJRg8SOe25iI3OnSiyTEjlICIwMrISfsIrTxaSOcKpunCSc3KhwfbJZPw7MFxqPMVC0PT8Z3NiHM008lFaV5rn');

export function Boton_pagar() {
    const [monto, setMonto] = useState(7000); // Puedes ajustar según tus necesidades

  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm monto={monto} />
      </Elements>
    </div>
  );
} 


/* 
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../scss/boton_pagar_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Boton_pagar() {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocusChange = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    });
  };

  const processPayment = () => {
    console.log("number => ", state.number);
    console.log("name => ", state.name);
    console.log("expiry => ", state.expiry);
    console.log("cvc => ", state.cvc);
    console.log(JSON.stringify(state));
  };

  return (
    <>
      <div className="contenedor-pago">
        <div className="card">
          <div className="card-body">
            <Cards
              number={state.number}
              name={state.name}
              expiry={state.expiry}
              cvc={state.cvc}
              focused={state.focus}
            />
            <form>
              <div className="form-group">
                <label htmlFor="number">Número de la tarjeta</label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  maxLength="16"
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="30"
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="expiry">Fecha de expiración</label>
                  <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    maxLength="4"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    maxLength="4"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
              </div>

              <button
                onClick={processPayment}
                type="button"
                className="btn btn-success"
              >
                Pagar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
 */

