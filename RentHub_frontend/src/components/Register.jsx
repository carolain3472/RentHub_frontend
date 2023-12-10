import { useForm } from "react-hook-form";
import { createuser } from "../api/register_api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../scss/register_style.css";
import Swal from "sweetalert2";

/**
 * Componente de formulario de registro.
 */

export function Register_form() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nombre, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [password, setContrasena] = useState("");
  const [showModal, setShowModal] = useState(false);

  /**
   * Maneja el cambio en el campo de nombre de usuario.
   * Actualiza el estado 'nombre' con el valor ingresado en el campo.
   * @param {Object} event - El evento de cambio del campo de nombre de usuario.
   */
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  /**
   * Maneja el cambio en el campo de contraseña.
   * Actualiza el estado 'contraseña' con el valor ingresado en el campo.
   * @param {Object} event - El evento de cambio del campo de contraseña.
   */
  const handlePasswordChange = (event) => {
    setContrasena(event.target.value);
  };

  /**
   * Maneja el cambio en el campo de correo electrónico.
   * Actualiza el estado 'email' con el valor ingresado en el campo.
   * @param {Object} event - El evento de cambio del campo de correo electrónico.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setDocumento(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setApellido(event.target.value);
  };

  /**
   * Maneja el envío del formulario de registro.
   * Crea un nuevo usuario utilizando los datos ingresados en los campos.
   * Navega a la página de inicio de sesión ("/login") después de enviar el formulario.
   * Elimina el valor de 'foto' del almacenamiento de sesión.
   */
  const handleSubmit = async () => {
    try {
      // Realiza la llamada al backend
      const response = await createuser(
        nombre,
        apellido,
        documento,
        email,
        password
      );
      console.log(response);
      // Verifica la respuesta del backend
      if (response.status === 200) {
        console.log(response.data.password);
        console.log(response.data.nombre);
        console.log(nombre);
        console.log(apellido);
        console.log(documento);
        console.log(password);
        console.log("entro aqui exito");
        // Si la respuesta indica éxito, muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha registrado correctamente",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 3000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Si la respuesta indica un error, muestra una notificación de error
        Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
        console.log(response.data.password);
        console.log(response.data.nombre);
        console.log(nombre);
        console.log(apellido);
        console.log(documento);
        console.log(password);
      }
    } catch (error) {
      // Si ocurre un error en la llamada al backend, muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al registrarse",
        text: "Verifica que la contraseña sea mayor a tres carácteres",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 3000,
      });
    }
  };

  /**
   * Abre el modal.
   * Actualiza el estado 'showModal' a true para mostrar el modal.
   */
  const handleModalOpen = () => {
    setShowModal(true);
  };

  /**
   * Cierra el modal.
   * Actualiza el estado 'showModal' a false para ocultar el modal.
   */
  const handleModalClose = () => {
    setShowModal(false);
  };

  /**
   * Maneja la acción de envío de formulario.
   * Realiza acciones con la URL de la imagen seleccionada, como mostrarla en la consola.
   * También guarda la URL de la imagen en el almacenamiento de sesión.
   */

  /**
   * Redirecciona al usuario a la página de inicio de sesión.
   */
  const redireccionarLogin = () => {
    navigate("/login"); // Redireccionar a la página de registro
  };

  /**
   * Redirecciona al usuario a la página de inicio.
   */
  const redireccionarInicio = () => {
    navigate("/"); // Redireccionar a la página de registro
  };

  return (
    <>
      <div className="container">
        <div className="row row-register">
          <div className="col col-izq-register">
            <img src="/images/RENTHUB_logo-NoBG.png" alt="" />
          </div>
          <div className="col col-der-register">
            <h1 className="titulo-register">REGISTRARSE</h1>
            <div className="izq-cont">
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit}
              >
                <div className="mb-3 my-3">
                  <input
                    type="text"
                    className="form-control custom-input-name"
                    value={nombre}
                    onChange={handleNameChange}
                    id="username"
                    placeholder="Ingresa tu nombre"
                    /* {...register("username", { required: true })} */
                  />
                </div>
                <div className="mb-3 my-3">
                  <input
                    type="text"
                    className="form-control custom-input-lastname"
                    value={apellido}
                    onChange={handleLastnameChange}
                    id="username"
                    placeholder="Ingresa tu apellido"
                    /* {...register("username", { required: true })} */
                  />
                </div>
                <div className="mb-3 my-3">
                  <input
                    type="text"
                    className="form-control custom-input-document"
                    value={documento}
                    onChange={handleDocumentChange}
                    id="username"
                    placeholder="Ingresa tu documento"
                    /* {...register("username", { required: true })} */
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control custom-input-email"
                    value={email}
                    onChange={handleEmailChange}
                    id="email"
                    placeholder="Ingresa tu email"
                    /* {...register("email", { required: true })} */
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control custom-input-password"
                    value={password}
                    onChange={handlePasswordChange}
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    /* {...register("password", { required: true })} */
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    className="btn-register form-control"
                    onClick={handleModalOpen}
                    /* disabled={!isFormComplete} */
                  >
                    Enviar
                  </Button>
                  

                  <Modal
                    show={showModal}
                    onHide={handleModalClose}
                    centered
                    backdrop="static"
                  >
                    <Modal.Header>
                      <Modal.Title>Confirmación de registro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Estos son los datos que deseas usar?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        type="submit"
                        variant="secondary"
                        onClick={() => {
                          handleModalClose();
                          handleSubmit();
                        }}
                      >
                        Confirmar
                      </Button>
                      <Button variant="secondary" onClick={handleModalClose}>
                        Cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="form-text text-dark">
                  Ya tienes cuenta?
                  <a className="registrarse" onClick={redireccionarLogin}>
                    {" "}
                    {/* navigate */}
                    Inicia sesión
                  </a>
                </div>
                <div className="form-text text-dark">
                  Vuelta al menú?
                  <a className="registrarse" onClick={redireccionarInicio}>
                    {" "}
                    {/* navigate */}
                    Click aquí
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
