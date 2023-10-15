import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { api } from "../api/register_api";
import Swal from "sweetalert2";
import "../scss/login_style.css";

/**
 * Obtiene el nombre de usuario almacenado en sessionStorage.
 * @returns {string | null} El nombre de usuario almacenado, o null si no hay ninguno.
 */
const getStoredEmail = () => {
  return sessionStorage.getItem("email");
};

/**
 * Componente Formulario para el inicio de sesión.
 */

export const Formulario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  /**
   * Maneja el cambio en el campo de nombre de usuario.
   * @param {Object} event - El evento de cambio del campo de nombre de usuario.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  /**
   * Maneja el cambio en el campo de contraseña.
   * @param {Object} event - El evento de cambio del campo de contraseña.
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Realiza una solicitud de inicio de sesión al servidor y almacena los datos de usuario y token de
   * autenticación.
   * Navega a la página "/next" en caso de éxito.
   * @param {Object} event - El evento de envío del formulario.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // Realiza una solicitud POST al servidor para el inicio de sesión
    axios;
    api
      .post("/login/login_view/", { email, password })
      .then((response) => {
        // Cuando la solicitud es exitosa
        if (response.data.valid) {
          sessionStorage.setItem("email", email);
          /* sessionStorage.setItem("email", response.data.user.email); */
          localStorage.setItem("authToken", response.data.token);
          navigate("/");

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

  /**
   * Redirecciona al usuario a la página de registro.
   */
  const redireccionarRegistro = () => {
    navigate("/register");
  };

  /**
   * Redireccionar a la página de registro
   */
  const redireccionarInicio = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="row row-login">
          <div className="col col-izq-login">
          <h1 className="titulo-login">INICIAR SESIÓN</h1>
            <div className="izq-cont">
              <form
                className="card-body cardbody-color"
                onSubmit={handleSubmit}
              >
                <div className="mb-3 text-center">
                  <input
                    id="form2Example18"
                    className="custom-input-email form-control"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3 text-center">
                  <input
                    type="password"
                    id="form2Example28"
                    className="custom-input-password form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />
                </div>
                {loginError && (
                  <div className="error-login text-danger">{loginError}</div>
                )}
                <div className="mb-3">
                  <button className="btn form-control btn-login" type="submit">
                    Iniciar sesión
                  </button>
                </div>
                <div className="form-text text-dark">
                  No estas registrado?
                  <a className="registrarse" onClick={redireccionarRegistro}>
                    Crea una cuenta
                  </a>
                </div>
                <div className="form-text text-dark">
                  Vuelta al menú?
                  <a className="registrarse" onClick={redireccionarInicio}>
                    Click aquí
                  </a>
                </div>
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
};
