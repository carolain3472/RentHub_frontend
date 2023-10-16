import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { appFirebase } from "../fb";
import Swal from "sweetalert2";
import { createobject } from "../api/objetcts_api";

export function FormularioObjeto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio_arrendamiento, setPrecioArrendamiento] = useState("");
  const [unidad_arrendamiento, setUnidadArrendamiento] = useState("");
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
    // Detectar el archivo
    const archivoI = e.target.files[0];

    // Cargarlo en el storage
    const storageRef = appFirebase.storage().ref();

    const archivoPath = storageRef.child(archivoI.name);

    await archivoPath.put(archivoI);
    console.log("Archivo cargado:", archivoI.name);

    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la llamada al backend
      const response = await createobject(
        documento,
        nombre,
        descripcion,
        categoria,
        precio_arrendamiento,
        unidad_arrendamiento
      );
      console.log(response);

      const coleccionRef = appFirebase.firestore().collection("objetos");
      const docu = coleccionRef.doc(nombre).set({nombre: nombre, url: archivoUrl});
      console.log("Archivo cargado:", nombre, "url:", archivoUrl);

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
        <div>
          <label>Precio de Arrendamiento:</label>
          <input
            type="number"
            id="precio_arrendamiento"
            value={precio_arrendamiento}
            onChange={(e) => setPrecioArrendamiento(e.target.value)}
          />
        </div>
        <div>
          <label>Unidad de Arrendamiento:</label>
          <input
            type="text"
            id="unidad_arrendamiento"
            value={unidad_arrendamiento}
            onChange={(e) => setUnidadArrendamiento(e.target.value)}
          />
        </div>

        <div>
          <label>Imágenes:</label>
          <input
            type="file"
            id="file"
            multiple
            accept="image/*"
            placeholder="Agregar imagen"
            onChange={fileHandler}
          />
        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
