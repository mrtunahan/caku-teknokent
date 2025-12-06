import axios from "axios";

// Ortam değişkeninden URL'i alıyoruz, yoksa varsayılan olarak localhost kullanıyoruz.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek öncesi (Request Interceptor) - Token'ı otomatik eklemek için
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;