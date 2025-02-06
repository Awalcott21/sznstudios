import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

interface PayPalCheckoutProps {
  cartItems: CartItem[];
  total: number;
  onSuccess: () => void;
}

const PayPalCheckout = ({ cartItems, total, onSuccess }: PayPalCheckoutProps) => {
  const { toast } = useToast();

  const createOrder = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('paypal-checkout', {
        body: {
          items: cartItems,
          total: total
        }
      });

      if (error) {
        console.error('Error creating PayPal order:', error);
        throw error;
      }

      console.log('PayPal order created:', data);
      return data.id;
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
      
      toast({
        title: "Order Successful!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
      
      onSuccess();
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
    <PayPalButtons 
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
      style={{ 
        layout: "vertical",
        shape: "rect",
        label: "checkout"
      }}
      forceReRender={[total, JSON.stringify(cartItems)]}
    />
  );
};

export default PayPalCheckout;