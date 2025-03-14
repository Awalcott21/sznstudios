
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const menuItems = [
    {
      title: 'Shop',
      subItems: ['New Arrivals', 'Men', 'Women', 'Accessories', 'Collections']
    },
    {
      title: 'Faith & Mission',
      href: '/faith-mission'
    },
    {
      title: 'Lookbook',
      href: '/lookbook'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="space-y-8">
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  {item.subItems ? (
                    <ul className="space-y-3 pl-4">
                      {item.subItems.map((subItem) => (
                        <li key={subItem}>
                          <a href="#" className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <a href={item.href} className="block text-lg text-muted-foreground hover:text-foreground transition-colors">
                      View
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
