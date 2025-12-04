import PageHeader from "../components/PageHeader";
import { FaCalendarAlt } from "react-icons/fa";

const Events = () => {
  const events = [
    { id: 1, title: "Girişimcilik Zirvesi 2025", date: "20 Şubat 2025", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500" },
    { id: 2, title: "Yapay Zeka ve Gelecek Paneli", date: "15 Mart 2025", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500" },
    { id: 3, title: "Kodlama Maratonu (Hackathon)", date: "01 Nisan 2025", img: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Etkinlikler" />
      <div className="container mx-auto px-4 py-16 max-w-6xl grid md:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
            <div className="h-48 overflow-hidden">
              <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="text-sm text-caku-red font-bold mb-2 flex items-center gap-2"><FaCalendarAlt /> {event.date}</div>
              <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Events;