import axios from "axios";

// Ortam değişkeninden URL'i al, yoksa varsayılan olarak 5000 portunu kullan
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek öncesi (Request Interceptor) - Token'ı otomatik ekle
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

// Yanıt sonrası (Response Interceptor) - 401 Hatası (Yetkisiz) gelirse çıkış yap
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Oturum süresi doldu veya yetkisiz erişim. Çıkış yapılıyor...");
      
      // Tokenları temizle
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      
      // Eğer zaten login sayfasında değilse yönlendir
      if (window.location.pathname !== "/admin") {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;