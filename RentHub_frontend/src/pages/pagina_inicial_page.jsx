import React, { useState, useEffect } from "react";
import { FormularioObjeto } from "../components/FormularioObjeto";
import { listobject } from "../api/objetcts_api";
import { appFirebase } from "../fb";

/**
 * Plantilla de inicio de sesión.
 * 
 * Esta función es una plantilla que muestra un formulario de inicio de sesión.
 * Utiliza el componente `Formulario` para renderizar el formulario en la página.
 */
export function Pagina_inicial_page() {

  const [objetos, setObjetos] = useState([]);
  const [docus, setDocus] = React.useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docusList = await appFirebase.firestore().collection("objetos").get();
        setDocus(docusList.docs.map((doc) => doc.data()));

        listobject()
        .then(response => {
          setObjetos(response.data);
        })

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, []);
  




  return <div>

    <FormularioObjeto/>
    
    <div>
  <h1>Listado de Objetos de Arrendamiento</h1>

  <div className="objetos-container">
  {objetos.map(objeto => (
    <div key={objeto.id} className="objeto-card">
      <h2>{objeto.nombre}</h2>
      {docus.map(doc => {
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
      <img src="" alt="" srcSet="" />
      <p>{objeto.descripcion}</p>
      <p>Categoría: {objeto.categoria}</p>
      <p>Precio de Arrendamiento: {objeto.precio_arrendamiento}</p>
      <p>Unidad de Arrendamiento: {objeto.unidad_arrendamiento}</p>
    </div>
  ))}
</div>

</div>

    </div>
}
        
