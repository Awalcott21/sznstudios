import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();

  const createOrder = async (data: any, actions: any) => {
    console.log('Creating PayPal order with total:', total);
    try {
      const orderData = {
        purchase_units: [{
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
            breakdown: {
              item_total: {
                value: total.toFixed(2),
                currency_code: "USD"
              }
            }
          },
          items: cartItems.map(item => ({
            name: item.item.alt,
            unit_amount: {
              value: item.item.price.toFixed(2),
              currency_code: "USD"
            },
            quantity: item.quantity.toString()
          }))
        }]
      };
      
      console.log('PayPal order data:', orderData);
      return actions.order.create(orderData);
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem creating your order. Please try again.",
      });
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log('Transaction completed:', details);
      
      localStorage.setItem('cart', '[]');
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast({
        title: "Order Successful!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
      
      onClose();
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem completing your order. Please try again.",
      });
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    toast({
      variant: "destructive",
      title: "PayPal Error",
      description: "There was a problem with PayPal. Please try again.",
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
                  <p className="font-medium">${(item.item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
          
          {cartItems.length > 0 && (
            <>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <PayPalButtons 
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  style={{ 
                    layout: "vertical",
                    shape: "rect",
                    label: "checkout"
                  }}
                  forceReRender={[total, cartItems]}
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