import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  // Get cart items from localStorage
  const getCartItems = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  };

  const cartItems = getCartItems();
  const itemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <header className="fixed w-full z-50 top-[41px] bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">SZN Studios</h1>
        </div>
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

      {showCart && (
        <CustomerDetailsModal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          cartItems={cartItems}
          total={cartItems.reduce((sum: number, item: any) => sum + item.item.price * item.quantity, 0)}
        />
      )}
    </header>
  );
};

export default Header;