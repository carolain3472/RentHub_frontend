import axios from 'axios'

export const api = axios.create({
  //baseURL: 'https://django-render-renthub-app.onrender.com'
   baseURL: 'http://127.0.0.1:8000/'
});

export const createuser = (nombre, apellido, documento, email, password) => {
  return api.post('/login/register/', { nombre, apellido, documento, email, password });
};

export const updateContra = (email, password) => {
  return api.post('/login/update_contra/', { email, password });
};

export const logout = (refresh_token) => {
  return api.post('/login/logout/', { refresh_token });
};