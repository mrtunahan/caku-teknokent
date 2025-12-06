import { useState } from "react";
import api from "../api";
import { FaLock, FaSave, FaArrowLeft, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: "Yeni şifreler birbiriyle uyuşmuyor!", type: "error" });
      return;
    }
    // ... (Backend isteği aynı) ...
    try {
      // Header'a token eklemene gerek yok, api.js bunu otomatik yapıyor!
      // URL de kısaldı.
      const res = await api.post("/auth/change-password", 
        { oldPassword: passwords.oldPassword, newPassword: passwords.newPassword }
      );
      if (res.data.success) {
        setMessage({ text: "Şifreniz başarıyla değiştirildi!", type: "success" });
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Hata oluştu!", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue"><FaUserShield /></div>
                Hesap Ayarları
            </h2>
            <Link to="/admin/dashboard" className="text-sm font-medium text-gray-500 hover:text-brand-blue flex items-center gap-1 transition">
                <FaArrowLeft /> Panele Dön
            </Link>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Mevcut Şifre</label>
            <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                <input type="password" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition" 
                  placeholder="••••••••"
                  value={passwords.oldPassword} onChange={e => setPasswords({...passwords, oldPassword: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Yeni Şifre</label>
                <input type="password" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition" 
                placeholder="••••••••"
                value={passwords.newPassword} onChange={e => setPasswords({...passwords, newPassword: e.target.value})} />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Tekrar</label>
                <input type="password" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition" 
                placeholder="••••••••"
                value={passwords.confirmPassword} onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 flex items-center justify-center gap-2 transition shadow-lg shadow-blue-200 mt-4">
            <FaSave /> Değişiklikleri Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;