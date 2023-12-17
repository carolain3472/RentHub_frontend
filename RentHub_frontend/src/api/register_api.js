import axios from 'axios'

export const api = axios.create({
  //baseURL: 'https://django-render-renthub-app.onrender.com'
   baseURL: 'http://renthubapigateway-env.eba-y4spyrjx.us-east-2.elasticbeanstalk.com/'
});

export const createuser = (nombre, apellido, documento, email, password) => {
  return api.post('users/login/register/', { nombre, apellido, documento, email, password });
};

export const updateContra = (email, password) => {
  return api.post('users/login/update_contra/', { email, password });
};

export const logout = (refresh_token) => {
  return api.post('users/login/logout/', { refresh_token });
};