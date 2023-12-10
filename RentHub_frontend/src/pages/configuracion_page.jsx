import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateContra } from "../api/register_api";
import { api } from "../api/register_api";
import Swal from "sweetalert2";
import "../scss/configuracion_page_style.css";

export function ConfiguracionPage() {
  const [password, setPassword] = useState("");
  const email = sessionStorage.getItem("email");
  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");
  const documento = sessionStorage.getItem("documento");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realiza una solicitud POST al servidor para el inicio de sesión
    axios;
    api
      .post("/login/update_contra/", { email: email, password: password })
      .then((response) => {
        console.log("Al menos aqui entra para cambiar");
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

  const redireccionarAtras= () => {
    navigate("/objetos_arrendamiento");
  };

  return (
    <>
      <div className="container">
        <div className="row row-login">
          <div className="col col-izq-login">
            <div className="cont-form-datos">
              <h2>Configuración de perfil</h2>

              <div className="cont-datos">
                <a>Nombre: {nombre}</a>
                <a>Apellido: {apellido}</a>
                <a>Documento: {documento}</a>
                <a>Correo electrónico: {email}</a>

              </div>

              <form className="formUpdatePass" onSubmit={handleSubmit}>
                <a>
                  Cambiar Contraseña:
                  <input
                    type="password"
                    className="custom-input-password form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Escribe tu nueva contraseña"
                  />
                </a>
                <button type="submit">Actualizar Contraseña</button>

                <a className="volverAtras" onClick={redireccionarAtras}>Volver atrás</a>
              </form>
 
            </div>
          </div>
          <div className="col col-der-login">
            <img src="/images/RENTHUB_logo-NoBG.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
