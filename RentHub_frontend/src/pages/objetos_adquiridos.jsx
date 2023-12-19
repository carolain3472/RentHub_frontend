import React, { useState, useEffect } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { FormularioObjeto } from "../components/FormularioObjeto";
import { listobjectadquirido } from "../api/objetcts_api";
import Swal from "sweetalert2";
import { api } from "../api/register_api";
import { Nav_bar_inicio } from "../components/Nav_bar_inicio";

import "../scss/pagina_inicial_style.css";
import "../scss/nav_bar_objetos_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export function Objetos_adquiridos_page() {
  const [objetos, setObjetos] = useState([]);
  const [docus, setDocus] = React.useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setModalMessage(""); // Limpiar el mensaje del modal al cerrarlo
  };

  const handleShow = () => setShow(true);

  const nombre = sessionStorage.getItem("nombre");
  const apellido = sessionStorage.getItem("apellido");
  const [selectedObject, setSelectedObject] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // Nuevo estado para el mensaje del modal

  const handleShowConsulta = (objeto) => {
    informacion_consulta(objeto);
    setSelectedObject(objeto);
    handleShow();  // Llama a handleShow sin argumentos
    console.log(objeto);
    console.log(modalMessage)
  };

  const aceptar_entrega = async (objeto) => {

      const formData = new FormData();
      formData.append("documento", sessionStorage.getItem("documento"));
      formData.append("objeto_id", objeto.objeto_arrendado.id);

      // Realiza la llamada al backend
      const response = await api.post("users/objetos/aceptar-entrega-cliente/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {

        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha aceptado que el objeto está en tu residencia",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      } else {
        
        Swal.fire("Error", "Hubo con la acción, vuelve a intentarlo nuevamente", "error");
      }
      
    };

    const devolver_objeto = async (objeto) => {

      const formData = new FormData();
      formData.append("documento", sessionStorage.getItem("documento"));
      formData.append("objeto_id", objeto.objeto_arrendado.id);

      // Realiza la llamada al backend
      const response = await api.post("users/objetos/enviar-propietario-devolucion/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

            // Verifica la respuesta del backend
            if (response.status === 200) {

              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Se ha devuelto el objeto correctamente",
                showConfirmButton: false,
                allowOutsideClick: false,
                showCancelButton: false,
                timer: 2000,
              }).then(() => {
                window.location.reload();
              });
            } else {
              
              Swal.fire("Error", "Hubo un problema al devolver el objeto", "error");
            }
    };
  

  const informacion_consulta = async (objeto) => {
    try {
      const formData = new FormData();
      formData.append("documento", sessionStorage.getItem("documento"));
      formData.append("objeto_id", objeto.objeto_arrendado.id);

      // Realiza la llamada al backend
      const response = await api.post("users/objetos/consulta-cliente-objeto/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Verifica la respuesta del backend
      if (response.status === 201) {
        setModalMessage("El propietario envió el objeto a tu residencia, por favor confirma cuando esté haya llegado");
      } else if (response.status === 202) {
        setModalMessage("Ya llegó el objeto nuevamente al propietario");
      } else if (response.status === 207) {
        setModalMessage("Cuando finalices de usar el objeto, envia por favor el registro de que ya fue devuelto.");
      }


    } catch (error) {
      setModalMessage("En este momento, el propietario está revisando la solicitud para hacer el envío del objeto");
      // Manejar errores aquí
    }
  };
  


  const handleAceptarEntrega = (objeto) => {
    // Abre un modal de confirmación
    Swal.fire({
      title: "¿El objeto ya llegó a tu residencia?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        aceptar_entrega(objeto);
      }
    });
  };

  const handleDevolverObjeto = (objeto) => {
    // Abre un modal de confirmación
    Swal.fire({
      title: "¿Deseas devolver el objeto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, devolver",
    }).then((result) => {
      if (result.isConfirmed) {
        devolver_objeto(objeto);
      }
    });
  };




  const handleCancelar = (objeto) => {
    // Abre un modal de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la eliminación
        cancelar_arrendamiento(objeto);
      }
    });
  };

  const cancelar_arrendamiento = async (objeto) => {
    try {
      const formData = new FormData();
      formData.append("documento", sessionStorage.getItem("documento"));
      formData.append("objeto_id", objeto.objeto_arrendado.id);

      // Realiza la llamada al backend
      const response = await api.post("users/objetos/cancelar-arrendamiento/", formData, {
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
          text: "Se ha cancelado el arrendamiento con éxito",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        }).then(() => {
          // Recarga la página después de 2 segundos
          window.location.reload();
        });
      } else if (response.status === 400) {
        // Muestra una notificación de error
        Swal.fire("Error", "No se puede cancelar el arrendamiento debido a que ya se envió el objeto", "error");
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
        const response = await listobjectadquirido();
        setObjetos(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
            Objetos que me han arrendado
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
                      <h5 className="card-title">
                        {objeto.objeto_arrendado.nombre}
                      </h5>
                      <p className="card-text">
                        {objeto.objeto_arrendado.descripcion}
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Categoría: {objeto.objeto_arrendado.categoria}
                      </li>
                      <li className="list-group-item">
                        Precio de Arrendamiento: $
                        {objeto.objeto_arrendado.precio_arrendamiento}
                      </li>
                      <li className="list-group-item">
                        Unidad de Arrendamiento:{" "}
                        {objeto.objeto_arrendado.unidad_arrendamiento}
                      </li>
                    </ul>
                    <div className="card-body botones-Eliminar-Modificar">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelar(objeto)}
                      >
                        <i className="fa-solid fa-trash-can"></i> Cancelar
                      </button>
                      <button className="btn btn-primary"  onClick={() => handleShowConsulta(objeto)}>
                        <i className="fa-solid fa-pencil-square"></i> +
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
          <Modal.Title>Estado de la Consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        
        </Modal.Body>
        <Modal.Footer>
          {modalMessage === "El propietario envió el objeto a tu residencia, por favor confirma cuando esté haya llegado" && (
            <Button variant="primary" onClick={() => handleAceptarEntrega(selectedObject)} >
              Ya llegó el objeto
            </Button>
          )}

          {modalMessage === "Cuando finalices de usar el objeto, envia por favor el registro de que ya fue devuelto." && (
            <Button variant="primary" onClick={() => handleDevolverObjeto(selectedObject)}>
              Devolver el objeto
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      </main>
    </>
  );
}
