// import * as SecureStore from "expo-secure-store";
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken')//await SecureStore.getItemAsync('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        // const refreshToken=null
        const res = await axios.post(`${api.defaults.baseURL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken
        });

        if (res.status === 200) {
          const { access_token } = res.data;
          
          // await SecureStore.setItemAsync('accessToken', access_token);
          localStorage.setItem('accessToken', access_token)
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // await SecureStore.deleteItemAsync('accessToken');
        // await SecureStore.deleteItemAsync('refreshToken');
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 
