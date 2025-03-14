
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const QuickNav = () => {
  const isMobile = useIsMobile();
  const categories = [
    'All',
    'New Arrivals',
    'T-Shirts',
    'Hoodies',
    'Accessories'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl mx-auto"
    >
      <div className="bg-background/90 backdrop-blur-sm rounded-full shadow-lg border px-3 py-2 md:px-6 md:py-3">
        <nav className="flex items-center justify-between md:justify-center md:space-x-6 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap px-2 md:px-0"
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default QuickNav;
