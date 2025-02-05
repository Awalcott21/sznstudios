import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";

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
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toString()
          }
        }
      ]
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      console.log('Transaction completed:', details);
      // Clear cart and show success message here
      localStorage.setItem('cart', '[]');
      window.dispatchEvent(new Event('cartUpdated'));
      onClose();
    });
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
            cartItems.map((item, index) => (
              <div key={`${item.type}-${item.item.alt}-${index}`} className="flex items-center space-x-4">
                <img 
                  src={item.item.src} 
                  alt={item.item.alt} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.item.alt}</h3>
                  {item.type === 'shirt' && item.item.size && (
                    <p className="text-sm text-gray-500">Size: {item.item.size}</p>
                  )}
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.item.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}
          
          {cartItems.length > 0 && (
            <>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="space-y-4">
                <PayPalButtons 
                  createOrder={createOrder}
                  onApprove={onApprove}
                  style={{ layout: "vertical" }}
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