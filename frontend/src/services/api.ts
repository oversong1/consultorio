import axios from 'axios';

const api = axios.create({
  // Se existir a variável na Vercel, usa ela. Se não, usa o localhost.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
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