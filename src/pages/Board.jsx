import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";

const Board = () => {
  // Yönetim Kurulu Listesi (6 Kişi)
  // Resim yolları: public/yon_kurulu/isim_soyisim.jpg formatında tahmin edilmiştir.
  const boardMembers = [
    {
      id: 1,
      name: "Prof. Dr. İbrahim BOZKURT",
      title: "Yönetim Kurulu Başkanı",
      image: "/yon_kurulu/i_b.jpeg",
      isChairman: true, // Başkan olduğunu belirtiyoruz
      email: "ibrahimbozkurt@karatekin.edu.tr"
    },
    {
      id: 2,
      name: "Doç. Dr. Hüseyin GÖKÇE",
      title: "Yönetim Kurulu Üyesi",
      image: "/yon_kurulu/h_g.jpg",
      email: "huseyingokce@karatekin.edu.tr"
    },
    {
      id: 3,
      name: "Doç. Dr. Nur Çağlar ÇETİNKAYA",
      title: "Yönetim Kurulu Üyesi",
      image: "/yon_kurulu/nur.jpg",
      email: "nurcaglar@karatekin.edu.tr"
    },
    {
      id: 4,
      name: "Dr.Öğr.Üyesi Fatih ISSI",
      title: "Yönetim Kurulu Üyesi",
      image: "/yon_kurulu/fat.jpg",
      email: "fatihissi@karatekin.edu.tr"
    },
    {
      id: 5,
      name: "Dr.Öğr.Üyesi Mücahit UĞUR",
      title: "Yönetim Kurulu Üyesi",
      image: "/yon_kurulu/muc.jpg",
      email: "m.ugur@karatekin.edu.tr"
    },
    {
      id: 6,
      name: "Ahmet USTA",
      title: "Yönetim Kurulu Üyesi",
      image: "/yon_kurulu/ahm.jpeg",
      email: ""
    },
    {
      id: 7,
      name: "İbrahim AYAZ",
      title: "Yönetim Kurulu Üyesi",
      image: "null",
      email: "null"
    }
  ];

  // Başkanı ve Üyeleri ayırıyoruz
  const chairman = boardMembers.find(m => m.isChairman);
  const members = boardMembers.filter(m => !m.isChairman);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      
      {/* BAŞLIK */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Yönetim Kurulu</h1>
        <div className="w-24 h-1.5 bg-caku-red mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
          Üniversite-Sanayi işbirliğine liderlik eden, vizyoner yönetim kadromuz.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* 1. SEVİYE: BAŞKAN (Özel, Büyük Kart) */}
        {chairman && (
          <div className="flex justify-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row group border-t-4 border-caku-red"
            >
              {/* Başkan Resmi */}
              <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden relative">
                <img 
                  src={chairman.image} 
                  alt={chairman.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=Fotograf+Yok"; }}
                />
                {/* Efekt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
              </div>

              {/* Başkan Bilgileri */}
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-caku-red font-bold tracking-widest uppercase text-sm mb-2">Yönetim Kurulu Başkanı</h3>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{chairman.name}</h2>
                <div className="w-16 h-1 bg-gray-200 mb-6 mx-auto md:mx-0"></div>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Çankırı Karatekin Üniversitesi Rektör Yardımcısı ve Teknokent Yönetim Kurulu Başkanı olarak, bölgemizin teknolojik kalkınmasına liderlik etmektedir.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                   <a href={`mailto:${chairman.email}`} className="flex items-center gap-2 px-6 py-2 bg-brand-blue text-white rounded-full hover:bg-brand-dark transition-colors font-medium text-sm">
                     <FaEnvelope /> E-posta Gönder
                   </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. SEVİYE: ÜYELER (Grid Yapısı) */}
        <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
          
          {members.map((member, index) => (
             <MemberCard key={member.id} member={member} delay={index * 0.1} />
          ))}
          
        </div>

      </div>
    </div>
  );
};

// Üye Kartı Bileşeni
const MemberCard = ({ member, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
      className="bg-white w-full max-w-xs rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
    >
      <div className="h-64 overflow-hidden relative bg-gray-100">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Uye"; }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-blue/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4 text-center">
           <span className="text-white font-semibold text-sm">{member.name}</span>
           <div className="flex gap-3">
              <a href={`mailto:${member.email}`} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-blue hover:text-caku-red transition-colors">
                <FaEnvelope className="text-xs"/>
              </a>
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-blue hover:text-caku-red transition-colors">
                <FaLinkedinIn className="text-xs"/>
              </a>
           </div>
        </div>
      </div>
      
      <div className="p-5 text-center flex-grow flex flex-col justify-center">
        <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-brand-blue transition-colors line-clamp-2">
          {member.name}
        </h3>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
          {member.title}
        </p>
      </div>
    </motion.div>
  );
};

export default Board;