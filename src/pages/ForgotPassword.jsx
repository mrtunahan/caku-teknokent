import { useState } from "react";
import api from "../api";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage({ text: res.data.message, type: "success" });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Bir hata oluştu.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Şifremi Unuttum</h2>
          <p className="text-gray-500 text-sm mt-2">Sisteme kayıtlı e-posta adresinizi giriniz.</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded mb-6 text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">E-posta Adresi</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/admin" className="text-sm text-gray-500 hover:text-brand-blue flex items-center justify-center gap-1 transition">
            <FaArrowLeft /> Giriş Ekranına Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;