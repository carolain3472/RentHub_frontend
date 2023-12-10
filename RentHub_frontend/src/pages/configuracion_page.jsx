import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateContra } from '../api/register_api';
import { api } from "../api/register_api";
import Swal from "sweetalert2";


export function ConfiguracionPage() {
  const [password, setPassword] = useState('');
  const email =   sessionStorage.getItem("email");
  const nombre =   sessionStorage.getItem("nombre");
  const apellido =   sessionStorage.getItem("apellido");
  const documento =   sessionStorage.getItem("documento");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



 const handleSubmit = (event) => {
   event.preventDefault();
   // Realiza una solicitud POST al servidor para el inicio de sesión
   axios;
   api
     .post("/login/update_contra/", { "email": email, "password":password })
     .then((response) => {

       console.log("Al menos aqui entra para cambiar")
       // Cuando la solicitud es exitosa

      if (response.status === 200) {
        console.log("entro aqui exito");
        // Si la respuesta indica éxito, muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha iniciado sesión correctamente",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir a la página actual
            window.location.reload();
          }
        });
      } else {
        setLoginError("Usuario o contraseña incorrectos");
        console.log("No pudo validar el inicio de sesión");

        Swal.fire({
          icon: "warning",
          title: "Datos incorrectos",
          text: "Verifica tus credenciales",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        });
      }
    })
    .catch((error) => {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Opps, parece que no existes",
        text: "¡Unete!",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 1800,
      });
    });
};

  




  return (
    <div>
      <h2>Cambia tus credenciales</h2>

     
        <div>
          <p>Nombre: {nombre}</p>
          <p>Apellido: {apellido}</p>
          <p>Documento: {documento}</p>
          <p>Correo electrónico: {email}</p>

          {/* Agrega otros campos de información del usuario según tus necesidades */}
        </div>
     

      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
}

