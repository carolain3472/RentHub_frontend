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
  const [selectedObject, setSelectedObject] = useState(props.selectedObject);
  const [monto, setMonto] = useState(7000); // Puedes ajustar según tus necesidades
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      // Puedes almacenar el objeto en el estado local antes de redirigir
      setSelectedObject(props.selectedObject);
      console.log(props.selectedObject)
    
     navigate("/pagar-arrendamiento");
    }, 3000);


    sessionStorage.setItem("objeto",  props.selectedObject.unidad_arrendamiento);
    sessionStorage.setItem("tiempo_arrendamiento", tiempo_arrendamiento);
    sessionStorage.setItem("unidad_arrendamiento", props.selectedObject.unidad_arrendamiento);
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
            disabled={true} 
            
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
          <label for="unidad_arrendamiento" className="form-label">Unidad de Arrendamiento:</label>
          <input
            className="form-input"
            type="text"
            id="unidad_academica"
            placeholder={props.selectedObject.unidad_arrendamiento}
            disabled={true} 
            
          />
         
        </div>

        <button className="form-submit-button" type="submit">Arrendar</button>
      </form>
    </div>
  );
}
