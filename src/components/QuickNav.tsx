
import React from 'react';
import { motion } from 'framer-motion';

const QuickNav = () => {
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
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="bg-background/80 backdrop-blur-sm rounded-full shadow-lg border px-6 py-3">
        <nav className="flex items-center space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
