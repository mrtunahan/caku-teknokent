import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import PageHeader from "../components/PageHeader";
import { FaEnvelope } from "react-icons/fa";

const Board = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/board-members");
        if (res.data.success) {
          setMembers(res.data.data);
        }
      } catch (error) {
        console.error("Üyeler yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Yönetim Kurulu Başkanı ve Üyeleri Ayırma
  const chairman = members.find(m => m.is_chairman);
  const otherMembers = members.filter(m => !m.is_chairman);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Yönetim Kurulu" />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* 1. SEVİYE: BAŞKAN (Varsa) */}
        {chairman && (
          <div className="flex justify-center mb-16">
             <MemberCard member={chairman} isChairman={true} />
          </div>
        )}

        {/* 2. SEVİYE: DİĞER ÜYELER */}
        <div className="flex flex-wrap justify-center gap-8">
          {otherMembers.map((member, index) => (
             <MemberCard key={member.id} member={member} delay={index * 0.1} />
          ))}
        </div>

        {members.length === 0 && (
            <div className="text-center text-gray-500 italic">Henüz yönetim kurulu üyesi eklenmemiş.</div>
        )}

      </div>
    </div>
  );
};

// Kart Bileşeni
const MemberCard = ({ member, isChairman = false, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col ${isChairman ? 'w-full max-w-md scale-105 border-blue-200 ring-4 ring-blue-50' : 'w-72'}`}
    >
      {/* Resim Alanı */}
      <div className={`relative overflow-hidden ${isChairman ? 'h-80' : 'h-64'}`}>
        <img 
          src={getImageUrl(member.image_url)} 
          alt={member.name} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Fotoğraf+Yok" }}
        />
        {/* Overlay (Hoverda E-posta) */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
           <div className="flex gap-4 text-white text-xl">
              {member.email && (
                  <a href={`mailto:${member.email}`} className="hover:text-caku-red transition-colors" title="E-posta Gönder">
                      <FaEnvelope />
                  </a>
              )}
           </div>
        </div>
      </div>

      {/* Bilgi Alanı */}
      <div className={`p-6 text-center flex flex-col justify-center flex-grow bg-white relative z-10`}>
        <h3 className={`font-bold text-gray-800 mb-1 ${isChairman ? 'text-2xl' : 'text-lg'}`}>
          {member.name}
        </h3>
        
        {/* Unvan */}
        {/* isChairman ise mavi kutucuk içinde (badge gibi) gösterir, değilse normal yazı */}
        {isChairman ? (
            <span className="mt-2 inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-bold rounded-full mx-auto uppercase tracking-wide">
                {member.title}
            </span>
        ) : (
            <p className="text-brand-blue font-medium uppercase tracking-wide text-xs">
                {member.title}
            </p>
        )}
        
        {/* NOT: Önceden burada hardcoded (sabit) bir 'Yönetim Kurulu Başkanı' yazısı vardı, onu sildim. 
            Artık sadece veritabanındaki title'ı gösteriyoruz. */}
            
      </div>
    </motion.div>
  );
};

export default Board;