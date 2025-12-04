import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Board from "./pages/Board"; // Board sayfasını import ettik
import { useEffect } from "react";
import Legislation from "./pages/Legislation";


function App() {
  const location = useLocation(); // Şu an hangi sayfadayız?

  // Sayfa değiştiğinde otomatik en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      {/* Eğer adres '/basvuru' DEĞİLSE Navbar'ı göster */}
      {location.pathname !== "/basvuru" && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* Tüm sayfalar buraya tanımlanmalı */}
          <Route path="/" element={<Home />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/yonetim-kurulu" element={<Board />} /> {/* Yönetim Kurulu eklendi */}
          <Route path="/kanun-ve-yonetmelikler" element={<Legislation />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;