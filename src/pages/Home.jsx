import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Sectors from "../components/Sectors";
import TabsNews from "../components/TabsNews";
import References from "../components/References";
import Seo from "../components/Seo"; // Import et


const Home = () => {
  return (
    <>
      <Seo 
        title="Ana Sayfa" 
        description="Çankırı Karatekin Üniversitesi Teknokent; girişimciler, firmalar ve AR-GE projeleri için inovasyon merkezi." 
        keywords="teknokent, çankırı, ar-ge, girişimcilik, ofis kiralama, teknoloji"
      />
      
      <Hero />
      <Stats />
      <Sectors />
      <TabsNews />
      <References />
    </>
  );
};

export default Home;