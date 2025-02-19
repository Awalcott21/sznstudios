import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

interface ShirtModalProps {
  isOpen: boolean;
  onClose: () => void;
  shirt: {
    src: string;
    alt: string;
    description: string;
  };
}

const ShirtModal = ({ isOpen, onClose, shirt }: ShirtModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { toast } = useToast();

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex(
      (item: any) => item.type === 'shirt' && item.item.alt === shirt.alt && item.item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        type: 'shirt',
        item: {
          ...shirt,
          price: 60,
          size: selectedSize
        },
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart",
      description: `${shirt.alt} (Size: ${selectedSize}) has been added to your cart.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{shirt.alt}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <img
            src={shirt.src}
            alt={shirt.alt}
            className="w-full h-auto rounded-lg"
          />
          <p className="text-sm text-gray-600">{shirt.description}</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Size</label>
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger className="bg-slate-700/30 border-slate-600">
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="S" className="hover:bg-slate-700">Small</SelectItem>
                  <SelectItem value="M" className="hover:bg-slate-700">Medium</SelectItem>
                  <SelectItem value="L" className="hover:bg-slate-700">Large</SelectItem>
                  <SelectItem value="XL" className="hover:bg-slate-700">X-Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">$60.00</span>
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShirtModal;