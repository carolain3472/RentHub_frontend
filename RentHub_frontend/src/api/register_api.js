import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
});

export const createuser = (nombre, apellido, documento, email, contrasena) => {
  return api.post('/login/register/', { nombre, apellido, documento, email, contrasena });
};