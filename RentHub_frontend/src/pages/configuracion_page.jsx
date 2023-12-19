import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateContra } from "../api/register_api";
import { api } from "../api/register_api";
import Swal from "sweetalert2";
import "../scss/configuracion_page_style.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ConfiguracionPage() {
  const [password, setPassword] = useState("");
  const email = sessionStorage.getItem("email");
  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");
  const documento = sessionStorage.getItem("documento");
  const navigate = useNavigate();

  const [permisoUbicacion, setPermisoUbicacion] = useState(
    localStorage.getItem("permisoUbicacion") === "true"
  );

  useEffect(() => {
    // Almacenar el estado en localStorage
    localStorage.setItem("permisoUbicacion", permisoUbicacion);
  }, [permisoUbicacion]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAceptar = () => {
    // Lógica para el botón de aceptar
    // Puedes mostrar el fragmento de código en tu div col col-der-login aquí
    console.log("Aceptar");
    setShow(false);
    setPermisoUbicacion(true);
  };

  const handleDenegar = () => {
    // Lógica para el botón de denegar
    // Puedes mostrar otro fragmento de código en tu div col col-der-login aquí
    console.log("Denegar");
    setShow(false);
  };

  const [ubicacionObtenida, setUbicacionObtenida] = useState(false);

  useEffect(() => {
    if (!ubicacionObtenida && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Ubicación obtenida: ${lat}, ${lng}`);
          setCenter({
            lat: lat,
            lng: lng,
          });
          setUbicacionObtenida(true);
        },
        (error) => {
          console.error(`Error al obtener la ubicación: ${error.message}`);
        }
      );
    }
  }, [ubicacionObtenida]);

  const libraries = ["places"];

  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const [center, setCenter] = useState({
    lat: 3.375685, // default latitude
    lng: -76.529917, // default longitude
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAWKY_vZf3wAsnzGsHK_zcYU5j88IS9KAw",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realiza una solicitud POST al servidor para el inicio de sesión
    axios;
    api
      .post("users/login/update_contra/", { email: email, password: password })
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

  const redireccionarAtras = () => {
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
                <button className="data_treatment" onClick={handleShow}>
                  Permitir ubicacion
                </button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Politica de tratamiento de datos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Fecha de entrada en vigor: 20/12/2023<br></br>
                    1. Introducción
                    <br></br>
                    En RentHub, nos tomamos en serio la privacidad y seguridad
                    de los datos personales de nuestros usuarios. Esta política
                    describe cómo recopilamos, utilizamos y protegemos la
                    información personal que obtenemos de los usuarios de
                    nuestros servicios.
                    <br></br>
                    2. Información que Recopilamos
                    <br></br>
                    Recopilamos información que nos proporcionas directamente,
                    como nombre, dirección de correo electrónico, información de
                    contacto. Además, podemos recopilar información
                    automáticamente a través del uso de cookies y otras
                    tecnologías de seguimiento cuando interactúas con nuestros
                    servicios.
                    <br></br>
                    3. Uso de la Información
                    <br></br>
                    Utilizamos la información recopilada para proporcionar,
                    mantener, proteger y mejorar nuestros servicios. Esto
                    incluye personalizar la experiencia del usuario, procesar
                    transacciones y enviar información relevante.
                    <br></br>
                    4. Compartir Información
                    <br></br>
                    No vendemos, alquilamos ni compartimos información personal
                    con terceros sin tu consentimiento, excepto cuando sea
                    necesario para proporcionar nuestros servicios o cumplir con
                    requisitos legales.
                    <br></br>
                    5. Seguridad de los Datos
                    <br></br>
                    Implementamos medidas de seguridad para proteger la
                    información personal contra el acceso no autorizado, la
                    alteración, la divulgación o la destrucción.
                    <br></br>
                    6. Derechos del Usuario
                    <br></br>
                    Los usuarios tienen derecho a acceder, corregir, eliminar y
                    oponerse al tratamiento de sus datos personales. Para
                    ejercer estos derechos, por favor, ponte en contacto con
                    nosotros renthub@contacto.com.
                    <br></br>
                    7. Cambios en la Política de Privacidad
                    <br></br>
                    Nos reservamos el derecho de actualizar esta política en
                    cualquier momento. Te recomendamos revisar periódicamente
                    para conocer cualquier cambio.
                    <br></br>
                    8. Contacto
                    <br></br>
                    Si tienes preguntas sobre esta política o el tratamiento de
                    datos personales, puedes contactarnos a través de
                    renthub@contacto.com.
                    <br></br>
                    Gracias por confiar en RentHub.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleDenegar}>
                      Denegar
                    </Button>
                    <Button variant="primary" onClick={handleAceptar}>
                      Aceptar
                    </Button>
                  </Modal.Footer>
                </Modal>
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

                <a className="volverAtras" onClick={redireccionarAtras}>
                  Volver atrás
                </a>
              </form>
            </div>
          </div>
          <div className="col col-der-login">
            {permisoUbicacion ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={center}
              >
                <MarkerF position={center} />
              </GoogleMap>
            ) : (
              <div>
                <img src="images/no_permission.png" alt="No permission" />
                <h2>Permite el acceso a tu ubicación</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
