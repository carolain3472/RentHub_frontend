import axios from 'axios'
import { api } from "../api/register_api";


export const createobject = async (documento, nombre, descripcion, categoria, precio_arrendamiento, unidad_arrendamiento, imagen) => {
  try {
    const response = await api.post('users/objetos/crear_objeto/', { documento, nombre, descripcion, categoria, precio_arrendamiento, unidad_arrendamiento, imagen });
    return response;
  } catch (error) {
    console.error("Error en la función createobject:", error);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};


export const listobject = async () => {
  const documento = sessionStorage.getItem("documento");
  return api.post('users/objetos/listar-objeto/', { documento });
};

export const listobjectuser = async () => {
  const documento = sessionStorage.getItem("documento");
  console.log(documento)
  return api.post('users/objetos/listar-objeto-propietario/', { documento });
  
};


export const listobjectadquirido = async () => {
  const documento = sessionStorage.getItem("documento");
  console.log(documento)
  return api.post('users/objetos/listar-objetos-adquiridos/', { documento });
  
};

export const listobjectsarrendados= async () => {
  const documento = sessionStorage.getItem("documento");
  console.log(documento)
  return api.post('users/objetos/listar-objetos-arrendados/', { documento });
  
};
