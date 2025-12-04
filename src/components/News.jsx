import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const News = () => {
  // Örnek Haber Verileri
  const newsData = [
    {
      id: 1,
      title: "Teknokent'te Yapay Zeka Zirvesi Gerçekleşti",
      date: "03 Aralık 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
      category: "Etkinlik"
    },
    {
      id: 2,
      title: "Kuluçka Merkezi Yeni Dönem Başvuruları Başladı",
      date: "01 Aralık 2025",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      category: "Duyuru"
    },
    {
      id: 3,
      title: "Üniversite-Sanayi İşbirliğinde Dev Adım",
      date: "28 Kasım 2025",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      category: "Haber"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Başlık Kısmı */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-brand-light font-semibold tracking-wider uppercase text-sm">Güncel Gelişmeler</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Haberler ve Duyurular</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all">
            Tümünü Gör <FaArrowRight />
          </a>
        </div>

        {/* Haber Kartları (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              
              {/* Resim Alanı */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded">
                  {item.category}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FaCalendarAlt className="text-brand-light" />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <a href="#" className="inline-flex items-center gap-2 text-brand-light font-medium hover:text-brand-blue transition-colors">
                  Devamını Oku <FaArrowRight className="text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobilde "Tümünü Gör" butonu */}
        <div className="mt-8 text-center md:hidden">
            <button className="bg-brand-blue text-white px-6 py-2 rounded shadow hover:bg-brand-dark transition-colors">
                Tüm Haberleri Gör
            </button>
        </div>

      </div>
    </section>
  );
};

export default News;