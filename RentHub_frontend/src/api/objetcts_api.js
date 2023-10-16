import axios from 'axios'
import { api } from "../api/register_api";


export const createobject = (documento, nombre, descripcion, categoria, precio_arrendamiento, unidad_arrendamiento) => {
    return api.post('/objetos/crear_objeto/', { documento, nombre, descripcion, categoria, precio_arrendamiento, unidad_arrendamiento });
  };


export const listobject = () => {
    return api.get('/objetos/listar_objeto/');
  };