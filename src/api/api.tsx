import * as SecureStore from "expo-secure-store";
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://e6cfe9ca586d.ngrok-free.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = SecureStore.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;