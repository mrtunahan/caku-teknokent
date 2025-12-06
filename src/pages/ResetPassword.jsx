import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { FaLock } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage({ text: "Şifreler uyuşmuyor.", type: "error" });
    }

    try {
      const res = await api.put(`/auth/reset-password/${token}`, { password });
      setMessage({ text: res.data.message, type: "success" });
      setTimeout(() => navigate("/admin"), 3000); // 3 saniye sonra girişe yönlendir
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Token geçersiz veya süresi dolmuş.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Yeni Şifre Belirle</h2>

        {message.text && (
          <div className={`p-4 rounded mb-6 text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Yeni Şifre</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue" 
                placeholder="Yeni şifreniz" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Şifre Tekrar</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue" 
                placeholder="Şifreyi onaylayın" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
            Şifreyi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;