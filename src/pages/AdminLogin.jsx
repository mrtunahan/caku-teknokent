import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { FaLock, FaUser } from "react-icons/fa";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // URL'in başındaki "http://..." kısmını siliyoruz, çünkü api.js'de tanımlı.
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    if (response.data.success) {
        // Token'ı tarayıcı hafızasına (localStorage) kaydet
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));
        
        // Panele yönlendir
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Giriş başarısız! Bilgileri kontrol edin.");
    }
  };
  const createTempAdmin = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username: "admin",
        password: "123456"
      });
      alert("✅ Admin kullanıcısı oluşturuldu! Şimdi giriş yapabilirsiniz.");
    } catch (err) {
      alert("Hata: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Yönetici Girişi</h2>
          <p className="text-gray-500 text-sm mt-2">Lütfen yetkili hesap bilgilerinizi giriniz.</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Kullanıcı Adı</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Kullanıcı adınız"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Şifre</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Giriş Yap
          </button>
          
        </form>
        
        <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;