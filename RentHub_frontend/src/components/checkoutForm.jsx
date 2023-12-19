import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { api } from "../api/register_api";

import "../scss/boton_pagar_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function StripeCheckoutForm({ monto }) {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const cancelPayment = (evt) => {
    Swal.fire({
      icon: "error",
      title: "Transacción cancelada",
      text: "La transacción ha sido cancelada.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/objetos_arrendamiento");
      }
    });
  };

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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

  const arrendarobject = async (formData) => {
    try {
      const response = await api.post('users/objetos/arrendar-objeto/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const processPayment = async () => {
    try {
      if (!stripe || !elements) {
        console.log("number => ", state.number);
        console.log("name => ", state.name);
        console.log("expiry => ", state.expiry);
        console.log("cvc => ", state.cvc);
        console.log(JSON.stringify(state));
        return;
      }

      // Obtén los valores directamente de los campos del formulario
      const number = document.getElementById("number").value;
      console.log(number);
      const name = document.getElementById("name").value;
      console.log(name);
      const expiry = document.getElementById("expiry").value;
      console.log(expiry);
      const cvc = document.getElementById("cvc").value;
      console.log(cvc);

      // Crear el token usando los valores de la tarjeta
      /*       const { token, error } = await stripe.createToken({
        card: {
          number,
          name,
          exp_month: parseInt(expiry.slice(0, 2), 10),
          exp_year: parseInt(expiry.slice(2), 10),
          cvc,
        },
      }); */

      const { token, error } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      console.log(token);

      if (error) {
        console.error(error);
        console.log(token);
      } else {
        // Enviar el token y otra información al backend para procesar el pago
        const response = await fetch("https://pago-microservice.onrender.com/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stripeEmail: sessionStorage.getItem("email"),
            stripeToken: token.id,
            monto: monto,
            usuario: sessionStorage.getItem("id"),
            nombre: sessionStorage.getItem("nombre"),
            arrendamiento: 5,
          }),
        });

        if (response.ok) {
          try {
            const formData = new FormData();
            formData.append(
              "objeto_arrendado",
              sessionStorage.getItem("objeto")
            );
            formData.append(
              "arrendador_cedula",
              sessionStorage.getItem("documento")
            );
            formData.append(
              "cantidad_tiempo_arrendamiento",
              sessionStorage.getItem("tiempo_arrendamiento")
            );
            formData.append(
              "unidad_tiempo_arrendamiento",
              sessionStorage.getItem("unidad_arrendamiento")
            );

            // Realiza la llamada al backend
            const response = await arrendarobject(formData);

            console.log(response);

            // Verifica la respuesta del backend
            if (response.status === 201) {
              console.log(response.data);
              console.log("entro aqui exito");
              // Si la respuesta indica éxito, muestra una notificación de éxito
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Se ha creado el objeto correctamente",
                showConfirmButton: false,
                allowOutsideClick: false,
                showCancelButton: false,
                timer: 2000,
              }).then(() => {
                // Recarga la página después de 2 segundos
                setTimeout(() => {
                  navigate("/objetos_adquiridos");
                }, 3000);
              });
            } else {
              // Si la respuesta indica un error, muestra una notificación de error
              Swal.fire(
                "Error",
                "Hubo un problema al guardar los datos",
                "error"
              );
            }
          } catch (error) {
            // Si ocurre un error en la llamada al backend, muestra una notificación de error
            Swal.fire({
              icon: "error",
              title: "Hubo un error al arrendar el objeto",
              text: "Verifica la información suministrada",
              showConfirmButton: false,
              allowOutsideClick: false,
              showCancelButton: false,
              timer: 3000,
            });
          }
          console.log("Pago exitoso");
        } else {
          // Muestra una notificación de error
          Swal.fire("Error", "Hubo un problema al procesar el pago", "error");
        }
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      // Muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al procesar el pago",
        text: "Verifica la información suministrada",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <h1 className="text-center">Pasarela de pago</h1>
      <div className="contenedor-pago">
        <div className="card tarjeta-pago">
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

              <div>Confirma los datos de la tarjeta</div>
              <CardElement className="form-control" />
              <div className="col" style={{ marginTop: "20px" }}>
                <button
                  onClick={processPayment}
                  type="button"
                  className="btn btn-success col-md-6"
                >
                  Pagar
                </button>

                <button
                  type="button"
                  className="btn btn-danger col-md-6"
                  onClick={cancelPayment}
                >
                  Cancelar pago
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
