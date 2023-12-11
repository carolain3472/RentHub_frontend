import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../api/register_api";

import { useNavigate } from "react-router-dom";
import { appFirebase } from "../fb";
import Swal from "sweetalert2";
//import { createobject } from "../api/objetcts_api";
import "../scss/formulario_objeto_style.css";

export function Formulario_modificar(props) {
  const [imagen, setImagen] = useState(props.selectedObject.imagen_objeto);
  const [nombre, setNombre] = useState(props.selectedObject.nombre);
  const [precio_arrendamiento, setPrecioArrendamiento] = useState(props.selectedObject.precio_arrendamiento);
  const [unidad_arrendamiento, setUnidadArrendamiento] = useState('Horas');
  const documento = sessionStorage.getItem("documento");

  const [archivoUrl, setArchivoUrl] = React.useState("");

  // ... (resto de tu código)

  /*   const guardarInfo = async (e) => {
    e.preventDefault();

    const objetoCreado = {
      nombre: nombre,
      imagen: imagenURL, // Usamos la URL de la imagen aquí
    };

    // Función de guardado

    try {
      // Agregar un documento a Firestore con nombre e imagen
      await addDoc(objetoCollectionRef, objetoCreado);
    } catch (error) {
      console.log(error);
    }
  }; */

  const fileHandler = async (e) => {
    const archivoI = e.target.files[0];
    setImagen(archivoI);
  };
  
  
  const modificarobject = async (formData) => {
    try {
      const response = await api.post('/objetos/actualizar-objeto/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("documento", documento);
      formData.append("objeto_id",props.selectedObject.id)

      formData.append("nombre_nuevo", nombre);
      formData.append("precio_nuevo", precio_arrendamiento);
      formData.append("unidad_nueva", unidad_arrendamiento);
      formData.append("imagen_nueva", imagen); 
      
      const response = await modificarobject(formData);

      console.log(response);

      // Verifica la respuesta del backend
      if (response.status === 200) {
        console.log(response.data);
        console.log("entro aqui exito");
        // Si la respuesta indica éxito, muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha modificado el objeto correctamente",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        }).then(() => {
          // Recarga la página después de 2 segundos
          window.location.reload();
        });

        /*         setTimeout(() => {
          navigate("/login");
        }, 3000); */
      } else {
        // Si la respuesta indica un error, muestra una notificación de error
        Swal.fire("Error", "Hubo un problema al modificar los datos", "error");
      }
    } catch (error) {
      // Si ocurre un error en la llamada al backend, muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al modificar el objeto",
        text: "Verifica la información suministrada",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label">Nombre:</label>
          <input
            className="form-input"
            type="text"
            id="nombre"
            value={nombre}
            placeholder="Nombre del articulo"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Precio de Arrendamiento:</label>
          <input
            className="form-input"
            type="number"
            id="precio_arrendamiento"
            value={precio_arrendamiento}
            placeholder="Precio del articulo x Unidad"
            onChange={(e) => setPrecioArrendamiento(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="unidad_arrendamiento" className="form-label">Unidad de Arrendamiento:</label>
          <select
            className="form-select"
            name="unidad_arrendamiento"
            id="unidad_arrendamiento"
            value={unidad_arrendamiento}
            onChange={(e) => setUnidadArrendamiento(e.target.value)}
          >
            <option value="Horas">Horas</option>
            <option value="Dias">Días</option>
            <option value="Semanas">Semanas</option>
            <option value="Meses">Meses</option>
          </select>
        </div>

        <div>
          <label className="form-label">Imágenes:</label>
          <input
            className="form-file-input"
            type="file"
            id="file"
            multiple
            accept="image/*"
            placeholder="Agregar imagen"
            onChange={fileHandler}
          />
        </div>

        <button className="form-submit-button" type="submit">Guardar</button>
      </form>
    </div>
  );
}
