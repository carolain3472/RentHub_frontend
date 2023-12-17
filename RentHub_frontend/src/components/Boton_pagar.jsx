import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './checkoutForm';

const stripePromise = loadStripe('pk_test_51OMNnaKFOk7cqJRg8SOe25iI3OnSiyTEjlICIwMrISfsIrTxaSOcKpunCSc3KhwfbJZPw7MFxqPMVC0PT8Z3NiHM008lFaV5rn');

export function Boton_pagar() {
    const [monto, setMonto] = useState(7000); // Puedes ajustar según tus necesidades

    const [tiempo_arrendamiento, setTiempoArrendamiento] = useState("");
    const [unidad_arrendamiento, setUnidadArrendamiento] = useState("");
  
  
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
  
    const handleSubmit2 = async (e) => {
      e.preventDefault();
      try {
  
        const formData = new FormData();
        formData.append("objeto_arrendado", props.selectedObject.id);
        formData.append("arrendador_cedula", sessionStorage.getItem("documento"));
        formData.append("cantidad_tiempo_arrendamiento", tiempo_arrendamiento);
        formData.append("unidad_tiempo_arrendamiento", props.selectedObject.unidad_arrendamiento);
  
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
              navigate("/pagar-arrendamiento");
            }, 3000);
          });
  
          /*         setTimeout(() => {
            navigate("/login");
          }, 3000); */
        } else {
          // Si la respuesta indica un error, muestra una notificación de error
          Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
        }
      } catch (error) {
        // Si ocurre un error en la llamada al backend, muestra una notificación de error
        Swal.fire({
          icon: "error",
          title: "Hubo un error al registrar el objeto",
          text: "Verifica la información suministrada",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 3000,
        });
      }
    };

  return (
    <div>
      <h1>Stripe Payment Demo</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm monto={monto} />
      </Elements>
    </div>
  );
}
