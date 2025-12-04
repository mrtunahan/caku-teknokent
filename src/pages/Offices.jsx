import PageHeader from "../components/PageHeader";

const Offices = () => {
  const offices = [
    { title: "Kuluçka Merkezi", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" },
    { title: "Toplantı Salonları", img: "https://images.unsplash.com/photo-1517502884422-41e157d4433c?w=600" },
    { title: "Açık Ofisler", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Ofisler ve Altyapı" />
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {offices.map((office, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg h-64">
            <img src={office.img} alt={office.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">{office.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Offices;