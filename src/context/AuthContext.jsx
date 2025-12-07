import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage'dan oturumu geri yükle
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      const storedUser = localStorage.getItem("adminUser");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Giriş Fonksiyonu
  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Giriş başarısız" };
    }
  };

  // Çıkış Fonksiyonu
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);