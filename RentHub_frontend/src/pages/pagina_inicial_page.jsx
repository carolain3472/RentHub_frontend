import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { FormularioObjeto } from "../components/FormularioObjeto";
import { listobject } from "../api/objetcts_api";
import { appFirebase } from "../fb";
import "../scss/pagina_inicial_style.css";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docusList = await appFirebase
          .firestore()
          .collection("objetos")
          .get();
        setDocus(docusList.docs.map((doc) => doc.data()));

        listobject().then((response) => {
          setObjetos(response.data);
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
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

        {/* obtener nombre de sesión */}
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {nombre} {apellido}
          </Dropdown.Toggle>

          <Dropdown.Menu className="menu-container">
            <Dropdown.Item className="menu-item" href="#">
              Perfil
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="#">
              Configuración
            </Dropdown.Item>
            <Dropdown.Item className="menu-item" href="#">
              Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

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

        <div className="row cards-container">
          {objetos.map((objeto) => (
            <div key={objeto.id} className="col-md">
              {" "}
              {/* Controla el número de columnas en función del tamaño de la pantalla */}
              <div className="card card-custom">
                {docus.map((doc) => {
                  if (doc.nombre === objeto.nombre) {
                    return (
                      <img
                        key={doc.id}
                        src={doc.url}
                        height={300}
                        width={240}
                        alt=""
                      />
                    );
                  }
                  return null; // Esto evita que renderice imágenes no coincidentes
                })}
                <img className="img-custom" src="" alt="" srcSet="" />
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
              </div>
            </div>
          ))}
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
    </main>
  );
}
