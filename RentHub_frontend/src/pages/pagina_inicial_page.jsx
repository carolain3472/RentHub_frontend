import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { FormularioObjeto } from "../components/FormularioObjeto";
import { listobject } from "../api/objetcts_api";
import { appFirebase } from "../fb";
import "../scss/pagina_inicial_style.css";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FormularioArrendamiento } from "../components/Formulario_arrendamiento";
import { Nav_bar_inicio } from "../components/Nav_bar_inicio";

/**
 * Plantilla de inicio de sesión.
 *
 * Esta función es una plantilla que muestra un formulario de inicio de sesión.
 * Utiliza el componente `Formulario` para renderizar el formulario en la página.
 */
export function Pagina_inicial_page() {
  const [objetos, setObjetos] = useState([]);
  const [docus, setDocus] = React.useState([]);

  const [show, setShow] = useState(false);

  const [showArrendar, setShowArrendar] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseArrendar = () => setShowArrendar(false);

  const handleShowArrendar = (objeto) => {
    setSelectedObject(objeto);
    setShowArrendar(true);
    console.log(objeto);
  };

  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listobject();
        setObjetos(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <Nav_bar_inicio />

      <section
        style={{
          marginTop: "70px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Objetos disponibles para arrendar
        </h1>

        <div className="container-fluid d-flex justify-content-center align-items-center">
          <div className="row justify-content-start">
            {objetos.map((objeto) => (
              <div key={objeto.id} className="col-lg col-md col-sm mb-5">
                <div className="card card-custom">
                  <img
                    src={objeto.objeto_imagen}
                    height={300}
                    width={240}
                    alt=""
                  />
                  <div className="body body-custom">
                    <h5 className="card-title">{objeto.nombre}</h5>
                    <p className="card-text">{objeto.descripcion}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Categoría: {objeto.categoria}
                    </li>
                    <li className="list-group-item">
                      Precio de Arrendamiento: ${objeto.precio_arrendamiento}
                    </li>
                    <li className="list-group-item">
                      Unidad de Arrendamiento: {objeto.unidad_arrendamiento}
                    </li>
                  </ul>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Propietari@: {nombre} {apellido}
                    </a>
                  </div>

                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => handleShowArrendar(objeto)}
                      style={{marginBottom:"10px"}}
                    >
                      <i className="fa-solid fa-pencil-square"></i> Arrendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <Modal show={showArrendar} onHide={handleCloseArrendar}>
        <Modal.Header closeButton>
          <Modal.Title>¿Cómo deseas arrendarlo?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioArrendamiento selectedObject={selectedObject} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseArrendar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
