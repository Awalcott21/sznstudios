import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast";
import { X, Minus, Plus } from "lucide-react";

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
}

const CustomerDetailsModal = ({
  isOpen,
  onClose,
  cartItems,
  total,
}: CustomerDetailsModalProps) => {
  const [step, setStep] = useState<"cart" | "details" | "payment">("cart");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const { toast } = useToast();

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Force a re-render by closing and reopening the modal
    onClose();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
    
    // Force a re-render by closing and reopening the modal
    onClose();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(customerDetails).some((value) => !value)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "cart" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.item.src}
                          alt={item.item.alt}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.item.alt}</p>
                          {item.type === 'shirt' && (
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          )}
                          <p>${item.item.price * item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold">Total:</p>
                    <p className="text-xl font-bold">${total}</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setStep("details")}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
            <Input
              placeholder="Name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, email: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, address: e.target.value })
              }
            />
            <Input
              placeholder="City"
              value={customerDetails.city}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, city: e.target.value })
              }
            />
            <Input
              placeholder="State"
              value={customerDetails.state}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, state: e.target.value })
              }
            />
            <Input
              placeholder="ZIP Code"
              value={customerDetails.zipCode}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, zipCode: e.target.value })
              }
            />
            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
          </form>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <div className="mb-4">
              <p>Total to pay: ${total}</p>
            </div>
            <div className="w-full">
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: total.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then(() => {
                    toast({
                      title: "Success!",
                      description: "Your payment has been processed successfully.",
                    });
                    localStorage.removeItem('cart');
                    onClose();
                  });
                }}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;