import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from "../api/register_api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const selectedObject = props.selectedObject
  const precioFinal= sessionStorage.getItem("precio")*sessionStorage.getItem("tiempo_arrendamiento");
  const navigate = useNavigate();
  
  const arrendarobject = async (formData) => {
    try {
      const response = await api.post('/objetos/arrendar-objeto/', formData, {
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


  const handleSubmit = async (event) => {
    event.preventDefault();

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
          stripeEmail: sessionStorage.getItem("email"), // Puedes obtenerlo del usuario
          stripeToken: token.id,
          monto: precioFinal,
          usuario: sessionStorage.getItem("id"),
          nombre: sessionStorage.getItem("nombre"),
          arrendamiento: 5
        }),
      });

      if (response.ok) {
         try {
  
            const formData = new FormData();
            formData.append("objeto_arrendado", sessionStorage.getItem("objeto"));
            formData.append("arrendador_cedula", sessionStorage.getItem("documento"));
            formData.append("cantidad_tiempo_arrendamiento", sessionStorage.getItem("tiempo_arrendamiento"));
            formData.append("unidad_tiempo_arrendamiento",  sessionStorage.getItem("unidad_arrendamiento"));
      
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
                  navigate("/objetos_arrendados");
                }, 3000);
              });
      

            } else {
              // Si la respuesta indica un error, muestra una notificación de error
              Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
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
          console.log("Pago exitoso")
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
