import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Sayfalar
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Board from "./pages/Board";
import Legislation from "./pages/Legislation";
// YENİ EKLENEN SAYFALAR
import About from "./pages/About";
import Mission from "./pages/Mission";
import Offices from "./pages/Offices";
import Kvkk from "./pages/Kvkk";
import CompanyList from "./pages/CompanyList";
import Contact from "./pages/Contact";
import References from "./components/References"; 
import CorporateIdentity from "./pages/CorporateIdentity";
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import Press from "./pages/Press";
import CompanyNews from "./pages/CompanyNews";
import Careers from "./pages/Careers"; // Dosya import edilmiş, harika.

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full !max-w-none min-h-screen bg-gray-50 font-sans flex flex-col overflow-x-hidden m-0 p-0">
      
      {location.pathname !== "/basvuru" && <Navbar />}
      
      <main className="flex-grow w-full !max-w-none m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/yonetim-kurulu" element={<Board />} />
          <Route path="/kanun-ve-yonetmelikler" element={<Legislation />} />
          
          {/* YENİ ROTALAR */}
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/misyon-vizyon" element={<Mission />} />
          <Route path="/ofisler" element={<Offices />} />
          <Route path="/kvkk" element={<Kvkk />} />
          <Route path="/firma-listesi" element={<CompanyList />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/ortaklarimiz" element={<div className="pt-32"><References /></div>} />
          
          {/* DÜZELTİLEN KISIM: Eski "yapım aşamasında" satırı silindi, yerine gerçek bileşen kondu */}
          <Route path="/kariyer" element={<Careers />} />
          
          <Route path="/kurumsal-kimlik" element={<CorporateIdentity />} />
          <Route path="/duyurular" element={<Announcements />} />
          <Route path="/etkinlikler" element={<Events />} />
          <Route path="/basinda-biz" element={<Press />} />
          <Route path="/firma-haberleri" element={<CompanyNews />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;