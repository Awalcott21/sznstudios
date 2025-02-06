import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import CartItem from "./cart/CartItem";
import PayPalCheckout from "./cart/PayPalCheckout";

type CartItem = {
  type: 'book' | 'shirt';
  item: {
    src: string;
    alt: string;
    price: number;
    size?: string;
  };
  quantity: number;
};

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

const CustomerDetailsModal = ({ isOpen, onClose, cartItems, total }: CustomerDetailsModalProps) => {
  const handleSuccess = () => {
    localStorage.setItem('cart', '[]');
    window.dispatchEvent(new Event('cartUpdated'));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.type}-${item.item.alt}-${index}`}
                  item={item.item}
                  type={item.type}
                  quantity={item.quantity}
                />
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <PayPalCheckout 
                  cartItems={cartItems}
                  total={total}
                  onSuccess={handleSuccess}
                />
                <Button onClick={onClose} variant="outline" className="w-full">
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;