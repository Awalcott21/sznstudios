import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type CustomerDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
};

const CustomerDetailsModal = ({ isOpen, onClose, cartItems, total }: CustomerDetailsModalProps) => {
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toString(),
          },
        },
      ],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {cartItems.map((item) => (
            <div key={item.alt} className="flex justify-between">
              <span>{item.alt}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;