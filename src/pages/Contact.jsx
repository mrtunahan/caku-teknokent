import PageHeader from "../components/PageHeader";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="İletişim" />
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* Bilgiler */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-brand-dark">Bize Ulaşın</h2>
          <div className="flex gap-4 items-start">
            <FaMapMarkerAlt className="text-caku-red text-2xl mt-1" />
            <p className="text-gray-600">Çankırı Karatekin Üniversitesi<br/>Uluyazı Kampüsü, Teknokent Binası<br/>Merkez / ÇANKIRI</p>
          </div>
          <div className="flex gap-4 items-center">
            <FaPhone className="text-caku-red text-xl" />
            <p className="text-gray-600">+90 (376) 218 95 00</p>
          </div>
          <div className="flex gap-4 items-center">
            <FaEnvelope className="text-caku-red text-xl" />
            <p className="text-gray-600">info@cakuteknokent.com.tr</p>
          </div>
        </div>
        {/* Harita */}
        <div className="h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.879767959866!2d33.6162553!3d40.5907711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4083d79a6a27301d%3A0x3c4347504752001c!2s%C3%87ank%C4%B1r%C4%B1%20Karatekin%20%C3%9Cniversitesi%20Teknokent!5e0!3m2!1str!2str!4v1708940000000!5m2!1str!2str" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
};
export default Contact;