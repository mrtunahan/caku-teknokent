import { motion } from "framer-motion";

const PageHeader = ({ title, image }) => {
  return (
    <div className="relative h-[300px] w-full bg-gray-900 overflow-hidden flex items-center justify-center mt-[80px]">
      {/* Arkaplan Resmi */}
      <img 
        src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

      {/* Başlık */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
        >
          {title}
        </motion.h1>
        <div className="w-24 h-1 bg-caku-red mx-auto rounded mt-4"></div>
      </div>
    </div>
  );
};

export default PageHeader;