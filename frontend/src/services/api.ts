import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Interceptor para injetar o Token em cada chamada à API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@MedSchedule:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;