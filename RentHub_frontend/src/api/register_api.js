import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://django-render-renthub-app.onrender.com'
});

export const createuser = (nombre, apellido, documento, email, contrasena) => {
  return api.post('/login/register/', { nombre, apellido, documento, email, contrasena });
};