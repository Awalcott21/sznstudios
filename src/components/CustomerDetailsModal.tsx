import React from "react";
import { Dialog } from "@headlessui/react";
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
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold">Checkout</Dialog.Title>
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CustomerDetailsModal;
