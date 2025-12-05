import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import axios from "axios"; // Backend bağlantısı için

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ana sayfadaki grafik ile uyumlu Sektör Listesi
  const sectorList = [
    "Yazılım",
    "Bilgisayar & İletişim",
    "Makine ve Teçhizat",
    "Savunma Sanayi",
    "Enerji",
    "İmalat Sanayi",
    "Kimya",
    "Medikal",
    "Müh. / Mimarlık"
  ];

  // Form Verileri State'i
  const [formData, setFormData] = useState({
    adiniz_soyadiniz: "",
    tc_kimlik_no: "",
    email: "",
    telefon: "",
    egitim_durumu: "Lisans Öğrencisi",
    sirketlesme_durumu: "Şirketim Yok (Girişimci)",
    proje_adi: "",
    proje_alani: "", // Sektör buradan seçilecek
    nace_kodu: "",
    anahtar_kelimeler: "",
    proje_ozeti: "",
    yenilikci_yonu: "",
    kullanilacak_yontem: "",
    pazar_ticarillesme: "",
    talep_edilen_ofis: "Kuluçka Ofisi (Açık Ofis)",
    personel_sayisi: "",
    kvkk_onay: false
  });

  // Input Değişikliklerini Yakala
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Formu Gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/applications', formData);
      
      if (response.data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Başvuru hatası:", error);
      alert("Başvuru gönderilirken bir hata oluştu: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            <FaCheckCircle />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h2>
          <p className="text-gray-600 mb-8">
            Ön başvurunuz başarıyla sistemimize kaydedilmiştir. Değerlendirme sürecinin ardından uzmanlarımız sizinle iletişime geçecektir.
          </p>
          <a href="/" className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Ana Sayfaya Dön
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      
      <div className="container mx-auto max-w-5xl text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
          Proje Ön Başvuru Formu
        </h1>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">
          Çankırı Karatekin Üniversitesi Teknokent bünyesinde yer almak için formu doldurunuz.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">

          {/* BÖLÜM 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="text-xl font-bold text-gray-800">Girişimci / Firma Bilgileri</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-style">Adınız Soyadınız *</label>
                <input required name="adiniz_soyadiniz" onChange={handleChange} type="text" className="input-style" placeholder="Örn: Ahmet Yılmaz" />
              </div>
              <div>
                <label className="label-style">T.C. Kimlik No *</label>
                <input required name="tc_kimlik_no" onChange={handleChange} type="text" maxLength="11" className="input-style" placeholder="11 haneli kimlik numaranız" />
              </div>
              <div>
                <label className="label-style">E-posta Adresi *</label>
                <input required name="email" onChange={handleChange} type="email" className="input-style" placeholder="ornek@email.com" />
              </div>
              <div>
                <label className="label-style">Telefon Numarası *</label>
                <input required name="telefon" onChange={handleChange} type="tel" className="input-style" placeholder="0555 123 45 67" />
              </div>
              <div>
                <label className="label-style">Eğitim Durumu</label>
                <select name="egitim_durumu" onChange={handleChange} className="input-style">
                  <option>Lisans Öğrencisi</option>
                  <option>Yüksek Lisans / Doktora</option>
                  <option>Mezun</option>
                  <option>Akademisyen</option>
                </select>
              </div>
              <div>
                <label className="label-style">Şirketleşme Durumu</label>
                <select name="sirketlesme_durumu" onChange={handleChange} className="input-style">
                  <option>Şirketim Yok (Girişimci)</option>
                  <option>Şahıs Şirketim Var</option>
                  <option>Limited/Anonim Şirketim Var</option>
                </select>
              </div>
            </div>
          </div>

          {/* BÖLÜM 2 */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="text-xl font-bold text-gray-800">Proje Genel Bilgileri</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="label-style">Proje Adı *</label>
                <input required name="proje_adi" onChange={handleChange} type="text" className="input-style" placeholder="Projenizin kısa ve anlaşılır adı" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="label-style">Proje Alanı / Sektör *</label>
                    {/* GÜNCELLENEN KISIM: SEKTÖR SEÇİMİ */}
                    <select required name="proje_alani" onChange={handleChange} className="input-style">
                      <option value="">Seçiniz</option>
                      {sectorList.map((sector, index) => (
                        <option key={index} value={sector}>{sector}</option>
                      ))}
                    </select>
                 </div>
                 <div>
                    <label className="label-style">NACE Kodu (Varsa)</label>
                    <input name="nace_kodu" onChange={handleChange} type="text" className="input-style" placeholder="Örn: 62.01.01" />
                 </div>
              </div>

              <div>
                <label className="label-style">Anahtar Kelimeler</label>
                <input name="anahtar_kelimeler" onChange={handleChange} type="text" className="input-style" placeholder="Örn: Yapay Zeka, Nesnelerin İnterneti, Tarım..." />
              </div>
            </div>
          </div>

          {/* BÖLÜM 3 */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="text-xl font-bold text-gray-800">Proje Detayları</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="label-style">Proje Özeti ve Amacı *</label>
                <textarea required name="proje_ozeti" onChange={handleChange} rows="4" className="input-style" placeholder="Projenin amacı nedir?"></textarea>
              </div>
              <div>
                <label className="label-style">Yenilikçi Yönü (İnovasyon) *</label>
                <textarea required name="yenilikci_yonu" onChange={handleChange} rows="4" className="input-style" placeholder="Teknolojik yenilikçi yönlerini detaylandırınız..."></textarea>
              </div>
              <div>
                <label className="label-style">Kullanılacak Yöntem ve Teknoloji</label>
                <textarea name="kullanilacak_yontem" onChange={handleChange} rows="3" className="input-style" placeholder="Kullanılacak teknolojiler..."></textarea>
              </div>
              <div>
                <label className="label-style">Pazar ve Ticarileşme Potansiyeli</label>
                <textarea name="pazar_ticarillesme" onChange={handleChange} rows="3" className="input-style" placeholder="Hedef kitle ve ticarileşme planı..."></textarea>
              </div>
            </div>
          </div>

          {/* BÖLÜM 4 */}
          <div>
             <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-200">
              <span className="bg-brand-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <h3 className="text-xl font-bold text-gray-800">Talep ve Onay</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                  <label className="label-style">Talep Edilen Ofis Tipi</label>
                  <select name="talep_edilen_ofis" onChange={handleChange} className="input-style">
                    <option>Kuluçka Ofisi (Açık Ofis)</option>
                    <option>Küçük Ofis (15-25 m²)</option>
                    <option>Orta Ofis (30-50 m²)</option>
                    <option>Büyük Ofis (50 m² üzeri)</option>
                  </select>
               </div>
               <div>
                  <label className="label-style">Personel Sayısı (Tahmini)</label>
                  <input name="personel_sayisi" onChange={handleChange} type="number" className="input-style" placeholder="Kişi sayısı" />
               </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <input required name="kvkk_onay" onChange={handleChange} type="checkbox" id="kvkk" className="mt-1 w-5 h-5 text-brand-blue rounded focus:ring-brand-blue" />
              <label htmlFor="kvkk" className="text-sm text-gray-600 cursor-pointer select-none">
                <span className="font-bold text-gray-800">KVKK Aydınlatma Metni</span>'ni okudum ve kişisel verilerimin işlenmesine izin veriyorum.
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full bg-caku-red hover:bg-red-700 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
              {loading ? 'Gönderiliyor...' : 'Başvuruyu Tamamla ve Gönder'} <FaPaperPlane />
            </button>
          </div>

        </form>
      </motion.div>
      
      <style>{`
        .label-style { display: block; font-size: 0.95rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
        .input-style { width: 100%; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.75rem 1rem; color: #1f2937; transition: all 0.2s; }
        .input-style:focus { outline: none; border-color: #005696; box-shadow: 0 0 0 3px rgba(0, 86, 150, 0.1); background-color: #ffffff; }
      `}</style>
    </div>
  );
};

export default Apply;