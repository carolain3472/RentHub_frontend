import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { FormularioObjeto } from "../components/FormularioObjeto";
import { listobjectsarrendados } from "../api/objetcts_api";
import Swal from "sweetalert2";
import { api } from "../api/register_api";
import { Nav_bar_inicio } from "../components/Nav_bar_inicio";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import "../scss/pagina_inicial_style.css";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Objetos_arrendados_page() {
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



  const handleEnviarObjeto = (objeto) => {
    // Abre un modal de confirmación
    Swal.fire({
      title: "¿Estás seguro que deseas enviar el objeto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, enviar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la eliminación
        enviarObjeto(objeto);
      }
    });
  };


  const enviarObjeto = async (objeto) => {

    const formData = new FormData();
    formData.append("documento", sessionStorage.getItem("documento"));
    formData.append("objeto_id", objeto.objeto_arrendado.id);

    // Realiza la llamada al backend
    const response = await api.post("users/objetos/confirmacion-entrega-cliente-envio/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

          if (response.status === 200) {

            Swal.fire({
              icon: "success",
              title: "Operación exitosa",
              text: "Se ha enviado el objeto correctamente",
              showConfirmButton: false,
              allowOutsideClick: false,
              showCancelButton: false,
              timer: 2000,
            }).then(() => {
              window.location.reload();
            });
          } else {
            
            Swal.fire("Error", "Hubo un problema al enviar el objeto", "error");
          }
};

const handleAceptarDevolucion = (objeto) => {
  // Abre un modal de confirmación
  Swal.fire({
    title: "¿Estás seguro que el objeto ya llegó a su residencia?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, realiza la eliminación
      aceptarDevolucion(objeto);
    }
  });
};


const aceptarDevolucion = async (objeto) => {

  const formData = new FormData();
  formData.append("documento", sessionStorage.getItem("documento"));
  formData.append("objeto_id", objeto.objeto_arrendado.id);

  // Realiza la llamada al backend
  const response = await api.post("users/objetos/aceptacion-propietario-devolucion/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

        if (response.status === 200) {

          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Se ha aceptado el objeto devuelta",
            showConfirmButton: false,
            allowOutsideClick: false,
            showCancelButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        } else {
          
          Swal.fire("Error", "Hubo un problema al aceptar el objeto", "error");
        }
};
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listobjectsarrendados();
        setObjetos(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const libraries = ["places"];

  const mapContainerStyle = {
    width: "16rem",
    height: "15rem",
  };

  const center = {
    lat: 3.375685, // default latitude
    lng: -76.529917, // default longitude
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDewmG857FFU-JG8KLANBBhE8qY-dApVoI",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

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
          Objetos que he arrendado:
        </h1>

        <div className="container-fluid d-flex justify-content-center align-items-center">
          <div className="row justify-content-start">
            {objetos.map((objeto) => (
              <div key={objeto.id} className="col-lg col-md col-sm mb-5">
                <div className="card card-custom">
                  <img
                    src={objeto.objeto_arrendado.objeto_imagen}
                    height={300}
                    width={240}
                    alt=""
                  />
                  <div className="body body-custom">
                    <h5 className="card-title">{objeto.objeto_arrendado.nombre}</h5>
                    <p className="card-text">{objeto.objeto_arrendado.descripcion}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Categoría: {objeto.objeto_arrendado.categoria}
                    </li>
                    <li className="list-group-item">
                      Precio de Arrendamiento: ${objeto.objeto_arrendado.precio_arrendamiento}
                    </li>
                    <li className="list-group-item">
                      Unidad de Arrendamiento: {objeto.objeto_arrendado.unidad_arrendamiento}
                    </li>
                    <li className="list-group-item">
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={16}
                        center={center}
                      >
                        <MarkerF position={center} />
                      </GoogleMap>
                      </li>
                  </ul>
                  <div className="card-body botones-Eliminar-Modificar">
                    <button className="btn btn-primary"  onClick={() => handleShow(objeto)}>
                      <i className="fa-solid fa-pencil-square"></i> Información
                    </button>
                    {!objeto.entrega_bool && (
                      <button className="btn btn-success" onClick={() => handleEnviarObjeto(objeto)}>
                        <i className="fa-solid fa-pencil-square"></i> Enviar objeto
                      </button>
                    )}

                    {objeto.devolucion_bool && (
                      <button className="btn btn-warning" onClick={() => handleAceptarDevolucion(objeto)}>
                        <i className="fa-solid fa-pencil-square"></i> Aceptar devolución
                      </button>
                    )}

{/*                     {if objeto.devolucion_bool=True}:
                    <button className="btn btn-primary">
                      <i className="fa-solid fa-pencil-square"></i> Aceptar entrega
                    </button> */}


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
    </main>
  );
}
