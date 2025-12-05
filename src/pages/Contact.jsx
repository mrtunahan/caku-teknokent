import { useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ ad_soyad: "", email: "", telefon: "", mesaj: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/contact", formData);
      if (res.data.success) {
        alert("Mesajınız başarıyla gönderildi!");
        setFormData({ ad_soyad: "", email: "", telefon: "", mesaj: "" });
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHeader title="İletişim" />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* SOL TARA: İletişim Formu */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Formu</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Ad-Soyad</label>
                <input required type="text" className="w-full bg-gray-100 border-none rounded-lg p-3 focus:ring-2 focus:ring-brand-blue outline-none transition" 
                  value={formData.ad_soyad} onChange={e => setFormData({...formData, ad_soyad: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">E-Posta</label>
                <input required type="email" className="w-full bg-gray-100 border-none rounded-lg p-3 focus:ring-2 focus:ring-brand-blue outline-none transition" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Telefon</label>
                <input type="tel" className="w-full bg-gray-100 border-none rounded-lg p-3 focus:ring-2 focus:ring-brand-blue outline-none transition" 
                  value={formData.telefon} onChange={e => setFormData({...formData, telefon: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Mesajınız</label>
                <textarea required rows="5" className="w-full bg-gray-100 border-none rounded-lg p-3 focus:ring-2 focus:ring-brand-blue outline-none transition resize-none" 
                  value={formData.mesaj} onChange={e => setFormData({...formData, mesaj: e.target.value})}></textarea>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <input required type="checkbox" className="mt-1" />
                <span>Kişisel Veriler Bilgilendirme Metni'ni okudum ve kabul ediyorum.</span>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#1e293b] text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition shadow-lg">
                {loading ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          </div>

          {/* SAĞ TARAF: İletişim Bilgileri ve Harita */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-gray-400 text-xl mt-1" />
                <div>
                  <h4 className="font-bold text-gray-700">Adres</h4>
                  <p className="text-gray-500">Çankırı Karatekin Üniversitesi<br/>Uluyazı Kampüsü, Teknokent Binası<br/>Merkez / ÇANKIRI</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaPhone className="text-gray-400 text-xl mt-1" />
                <div>
                  <h4 className="font-bold text-gray-700">Telefon</h4>
                  <p className="text-gray-500">+90 (376) 218 95 00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-gray-400 text-xl mt-1" />
                <div>
                  <h4 className="font-bold text-gray-700">E-Posta</h4>
                  <p className="text-gray-500">info@cakuteknokent.com.tr</p>
                </div>
              </div>
            </div>

            {/* HARİTA */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0357376786675!2d33.5857!3d40.6058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4082266666666667%3A0x123456789!2sCankiri%20Karatekin%20University!5e0!3m2!1sen!2str!4v1600000000000!5m2!1sen!2str" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;