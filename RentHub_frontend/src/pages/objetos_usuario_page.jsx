import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { Formulario_modificar } from "../components/Formulario_modificar";
import { listobjectuser } from "../api/objetcts_api";
import Swal from "sweetalert2";
import { api } from "../api/register_api";
import { Nav_bar_inicio } from "../components/Nav_bar_inicio";

import "../scss/pagina_inicial_style.css";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Objetos_usuario_page() {
  const [objetos, setObjetos] = useState([]);
  const [docus, setDocus] = React.useState([]);
  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");
  const [selectedObject, setSelectedObject] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (objeto) => {
    setSelectedObject(objeto);
    setShow(true);
    console.log(objeto);
  };


  const handleEliminar = (objeto) => {
    // Abre un modal de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la eliminación
        eliminarObjeto(objeto);
      }
    });
  };

  const eliminarObjeto = async (objeto) => {
    try {
      const formData = new FormData();
      formData.append("documento", sessionStorage.getItem("documento"));
      formData.append("objeto_id", objeto.id);

      // Realiza la llamada al backend
      const response = await api.post("/objetos/eliminar-objeto/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Verifica la respuesta del backend
      if (response.status === 200) {
        console.log(response.data);

        // Muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha eliminado el objeto correctamente",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        }).then(() => {
          // Recarga la página después de 2 segundos
          window.location.reload();
        });
      } else {
        // Muestra una notificación de error
        Swal.fire("Error", "Hubo un problema al eliminar el objeto", "error");
      }
    } catch (error) {
      // Muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al eliminar el objeto",
        text: "Verifica la información suministrada",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 3000,
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listobjectuser();
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
          Tus objetos para arrendar
        </h1>
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <div className="row justify-content-start">
            {objetos.map((objeto) => (
              <div key={objeto.id} className="col-2 md-3 mb-4">
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
                  <div className="card-body botones-Eliminar-Modificar">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEliminar(objeto)}
                    >
                      <i className="fa-solid fa-trash-can"></i> Eliminar
                    </button>
                    <button className="btn btn-warning" onClick={() => handleShow(objeto)}>
                      <i className="fa-solid fa-pencil-square"></i> Modificar
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
          <Modal.Title>Modifica tu objeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formulario_modificar selectedObject={selectedObject} />
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
