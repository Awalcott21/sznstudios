
import React from "react";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-screen max-h-[800px] overflow-hidden bg-black">
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'url("/lovable-uploads/469d4cef-4eb6-483e-a468-a2e6193b4e9e.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(20%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-display-lg md:text-[5rem] font-bold text-white mb-6 tracking-tight"
        >
          SZN'S Change; GOD Remains
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg md:text-heading-sm text-white/90 max-w-2xl mb-8 font-light"
        >
          Where style speaks volumes and faith runs deep
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button 
            className="bg-white text-black px-8 py-3 text-body-base font-medium hover:bg-gold-50 transition-colors duration-300"
          >
            Shop Collection
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
