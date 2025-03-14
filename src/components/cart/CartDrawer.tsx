
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItem from "./CartItem";
import PayPalCheckout from "./PayPalCheckout";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: any[];
  total: number;
}

const CartDrawer = ({ isOpen, onOpenChange, cartItems, total }: CartDrawerProps) => {
  const { toast } = useToast();

  const handleSuccess = () => {
    localStorage.setItem('cart', '[]');
    window.dispatchEvent(new Event('cartUpdated'));
    onOpenChange(false);
    toast({
      title: "Success!",
      description: "Your order has been placed successfully.",
    });
  };

  const handleRemoveItem = (index: number) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    currentCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={`${item.type}-${item.item.alt}-${index}`}
                    item={item.item}
                    type={item.type}
                    quantity={item.quantity}
                    onRemove={() => handleRemoveItem(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Free shipping on orders over $100</span>
                {total < 100 && (
                  <span>Add ${(100 - total).toFixed(2)} more for free shipping</span>
                )}
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground italic">
                  A portion of proceeds supports ministry efforts
                </p>
                
                <PayPalCheckout 
                  cartItems={cartItems}
                  total={total}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
