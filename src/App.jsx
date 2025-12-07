import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsDetail from "./pages/NewsDetail";
import NewsList from "./pages/NewsList"; // 1. TANIM (Sadece bu kalacak)

// Mevcut Sayfalar
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Board from "./pages/Board";
import Legislation from "./pages/Legislation";
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
import Careers from "./pages/Careers";
import AdminProfile from "./pages/AdminProfile";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// YENİ ADMIN SAYFALARI
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Navbar'ın GİZLENMESİ gereken sayfalar (Başvuru ve Admin sayfaları)
  const hideNavbarRoutes = ["/basvuru", "/admin", "/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="w-full !max-w-none min-h-screen bg-gray-50 font-sans flex flex-col overflow-x-hidden m-0 p-0">
      
      {/* Şartlı Navbar Gösterimi */}
      {!shouldHideNavbar && <Navbar />}
      
      <main className="flex-grow w-full !max-w-none m-0 p-0">
        <Routes>
          {/* Public Rotalar */}
          <Route path="/" element={<Home />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/yonetim-kurulu" element={<Board />} />
          <Route path="/kanun-ve-yonetmelikler" element={<Legislation />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/misyon-vizyon" element={<Mission />} />
          <Route path="/ofisler" element={<Offices />} />
          <Route path="/kvkk" element={<Kvkk />} />
          <Route path="/firma-listesi" element={<CompanyList />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/ortaklarimiz" element={<div className="pt-32"><References /></div>} />
          <Route path="/kariyer" element={<Careers />} />
          <Route path="/kurumsal-kimlik" element={<CorporateIdentity />} />
          
          <Route path="/haber-detay/:id" element={<NewsDetail />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/liste/:category" element={<NewsList />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} /> 
          
          {/* ADMIN ROTALARI */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

export default App;