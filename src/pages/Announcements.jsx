import PageHeader from "../components/PageHeader";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Announcements = () => {
  const items = [
    { id: 1, title: "Teknokent 2025 Kira Destekleri Açıklandı", date: "10 Ocak 2025", desc: "Yeni dönem kira destek oranları ve başvuru şartları belirlendi." },
    { id: 2, title: "Otopark Alanı Düzenlemesi", date: "05 Ocak 2025", desc: "A Blok önündeki otopark alanı 15 Ocak tarihine kadar bakıma alınacaktır." },
    { id: 3, title: "Yemekhane Hizmet Saatleri Değişikliği", date: "02 Ocak 2025", desc: "Yemekhane hizmet saatleri 11:30 - 14:00 olarak güncellenmiştir." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Duyurular" />
      <div className="container mx-auto px-4 py-16 max-w-5xl grid gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-brand-blue flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaCalendarAlt className="text-caku-red" /> {item.date}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
            <button className="text-brand-blue font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              Detaylar <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Announcements;