import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();

  const updateCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  };

  useEffect(() => {
    // Initial load
    updateCartItems();

    // Listen for changes
    window.addEventListener('cartUpdated', updateCartItems);
    window.addEventListener('storage', updateCartItems);

    return () => {
      window.removeEventListener('cartUpdated', updateCartItems);
      window.removeEventListener('storage', updateCartItems);
    };
  }, []);

  const itemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
  const total = cartItems.reduce((sum: number, item: any) => sum + item.item.price * item.quantity, 0);

  return (
    <header className="fixed w-full z-50 top-0 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1" />
        <div className="flex items-center justify-center flex-1">
          <img
            src="/lovable-uploads/2cfaa4c7-485c-4c43-aa20-b5c97b5968e2.png"
            alt="SZN Studios Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex-1 flex justify-end">
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <CustomerDetailsModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        total={total}
      />
    </header>
  );
};

export default Header;