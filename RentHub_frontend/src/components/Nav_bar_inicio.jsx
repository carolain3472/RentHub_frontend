import React from "react";
import Swal from "sweetalert2";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FormularioObjeto } from "../components/FormularioObjeto";

/**
 * Componente de barra de navegación principal.
 * Muestra la marca y los enlaces a diferentes secciones del sitio web.
 * También incluye un enlace para iniciar sesión.
 */

export function Nav_bar_inicio() {
  const [objetos, setObjetos] = useState([]);
  const [docus, setDocus] = React.useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");
  const [selectedObject, setSelectedObject] = useState(null);

  const handleLogout = async () => {
    try {
      // Realiza la llamada al backend
      const response = await logout(sessionStorage.getItem("refresh"));
      // Verifica la respuesta del backend
      if (response.status === 200) {
        // Si la respuesta indica éxito, muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Ha cerrado sesión con exito",
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
        Swal.fire("Error", "Hubo un problema al cerrar sesión", "error");
      }
    } catch (error) {
      // Si ocurre un error en la llamada al backend, muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al cerrar sesión",
        text: "Error",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar-objetos fixed-top">
        <a className="navbar-brand" href="#">
          RentHub
        </a>

        <section className="mid-sect-nav">
          <form className="form form-mid-sect-nav">
            <input
              className="form-control form-control-mid-sect-nav mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-mid-sect-nav my-2 my-sm-0"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Search
            </button>
          </form>
          <input
            type="button"
            value="+"
            className="btn-crear-obj"
            onClick={handleShow}
          />
        </section>

        <section className="message_user">
          <a className="message_icon" href="/mensajes_usuario">
            <img src="/images/mensaje.png" alt="Icono de Mensaje" />
          </a>
        </section>

        {/* obtener nombre de sesión */}
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {nombre} {apellido}
          </Dropdown.Toggle>

          <Dropdown.Menu className="menu-container">
            <Dropdown.Item className="menu-item" href="/configuracion_perfil">
              Configuración de Perfil
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="/objetos_arrendamiento">
              Objetos disponibles
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="/objetos_propiertario">
              Objetos propios disponibles
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="/objetos_arrendados">
              Objetos propios arrendados
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="/objetos_adquiridos">
              Objetos arrendados
            </Dropdown.Item>
            <Dropdown.Item
              className="menu-item"
              href="#"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Qué quieres alquilar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioObjeto />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
