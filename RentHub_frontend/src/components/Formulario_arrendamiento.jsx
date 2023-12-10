import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../api/register_api";

import { useNavigate } from "react-router-dom";
import { appFirebase } from "../fb";
import Swal from "sweetalert2";
//import { createobject } from "../api/objetcts_api";
import "../scss/formulario_objeto_style.css";

export function FormularioArrendamiento(props) {
  const [tiempo_arrendamiento, setTiempoArrendamiento] = useState("");
  const [unidad_arrendamiento, setUnidadArrendamiento] = useState("");

  const arrendarobject = async (formData) => {
    try {
      const response = await api.post('/objetos/arrendar-objeto/', formData, {
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
      formData.append("objeto_arrendado", props.selectedObject.id);
      formData.append("arrendador_cedula", sessionStorage.getItem("documento"));
      formData.append("cantidad_tiempo_arrendamiento", tiempo_arrendamiento);
      formData.append("unidad_tiempo_arrendamiento", unidad_arrendamiento);

      // Realiza la llamada al backend
      const response = await arrendarobject(formData);

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
          <label className="form-label">Objeto:</label>
          <input
            className="form-input"
            type="text"
            id="nombre"
            
            placeholder={props.selectedObject.nombre}
            
          />
        </div>


        <div>
          <label className="form-label">Cantidad de tiempo de Arrendamiento:</label>
          <input
            className="form-input"
            type="number"
            id="tiempo_arrendamiento"
            value={tiempo_arrendamiento}
            placeholder="Precio del articulo x Unidad"
            onChange={(e) => setTiempoArrendamiento(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Unidad de Arrendamiento:</label>
          <select
            className="form-select"
            id="unidad_arrendamiento"
            value={unidad_arrendamiento}
            onChange={(e) => setUnidadArrendamiento(e.target.value)}
          >
            <option value="horas">Horas</option>
            <option value="dias">Días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
          </select>
        </div>

        <button className="form-submit-button" type="submit">Arrendar</button>
      </form>
    </div>
  );
}
