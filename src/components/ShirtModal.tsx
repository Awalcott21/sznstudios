import React from "react";
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

interface ShirtModalProps {
  isOpen: boolean;
  onClose: () => void;
  shirt: {
    src: string;
    alt: string;
  };
}

const ShirtModal = ({ isOpen, onClose, shirt }: ShirtModalProps) => {
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{shirt.alt}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <img
            src={shirt.src}
            alt={shirt.alt}
            className="w-full h-auto rounded-lg"
          />
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Size</label>
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Small</SelectItem>
                  <SelectItem value="M">Medium</SelectItem>
                  <SelectItem value="L">Large</SelectItem>
                  <SelectItem value="XL">X-Large</SelectItem>
                  <SelectItem value="2XL">2X-Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">$60.00</span>
              <Button
                onClick={() => {
                  // Will implement order flow in next step
                  console.log("Order clicked:", {
                    shirt: shirt.alt,
                    size: selectedSize,
                  });
                }}
                disabled={!selectedSize}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShirtModal;