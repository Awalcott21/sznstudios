
import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import CartDrawer from "./cart/CartDrawer";
import MainNav from "./NavigationMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const updateCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  };

  useEffect(() => {
    updateCartItems();
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
    <header className="fixed w-full z-50 top-0 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 flex items-center justify-start">
            <img
              src="/lovable-uploads/5abab4cf-67d5-4ded-83b1-6324aacd243d.png"
              alt="SZN Studios Logo"
              className="h-16 w-auto"
            />
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <MainNav />
          </div>

          <div className="flex-1 flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon"
            >
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
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
      </div>

      <MobileMenu 
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />

      <CartDrawer
        isOpen={showCart}
        onOpenChange={setShowCart}
        cartItems={cartItems}
        total={total}
      />
    </header>
  );
};

export default Header;
