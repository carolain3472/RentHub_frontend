import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../api/register_api";

import { useNavigate } from "react-router-dom";
import { appFirebase } from "../fb";
import Swal from "sweetalert2";
//import { createobject } from "../api/objetcts_api";
import "../scss/formulario_objeto_style.css";

export function FormularioObjeto() {
  const [imagen, setImagen] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("Hogar");
  const [precio_arrendamiento, setPrecioArrendamiento] = useState("");
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
  
  
  const createobject = async (formData) => {
    try {
      const response = await api.post('/objetos/crear_objeto/', formData, {
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
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("categoria", categoria);
      formData.append("precio_arrendamiento", precio_arrendamiento);
      formData.append("unidad_arrendamiento", unidad_arrendamiento);
      formData.append("imagen", imagen); 
      // Realiza la llamada al backend
      const response = await createobject(formData);

      console.log(response);

      // Verifica la respuesta del backend
      if (response.status === 201) {
        console.log(response.data);
        console.log("entro aqui exito");
        // Si la respuesta indica éxito, muestra una notificación de éxito
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha creado el objeto correctamente",
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
        Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
      }
    } catch (error) {
      // Si ocurre un error en la llamada al backend, muestra una notificación de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error al registrar el objeto",
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
          <label className="form-label">Descripción:</label>
          <input
            className="form-input"
            type="text"
            id="descripcion"
            value={descripcion}
            placeholder="Descripción del articulo"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="categoria" className="form-label">Categoría:</label>
          <select
            className="form-select"
            name="categoria"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Hogar">Hogar</option>
            <option value="Vehiculos">Vehículos</option>
            <option value="Construccion">Construcción</option>
            <option value="Entretenimiento">Entretenimiento</option>
          </select>
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
