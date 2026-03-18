import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7163/api' // ודאי שזה ה-URL המדויק שלך
});

// המיירט (Interceptor) - מוסיף את הטוקן אוטומטית לכל בקשה
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;