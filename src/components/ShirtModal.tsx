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
import CustomerDetailsModal from "./CustomerDetailsModal";

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
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const handleOrderClick = () => {
    setShowCustomerDetails(true);
  };

  const handleCustomerDetailsClose = () => {
    setShowCustomerDetails(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] w-full">
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
                  onClick={handleOrderClick}
                  disabled={!selectedSize}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CustomerDetailsModal
        isOpen={showCustomerDetails}
        onClose={handleCustomerDetailsClose}
        shirtDetails={{
          ...shirt,
          size: selectedSize,
        }}
      />
    </>
  );
};

export default ShirtModal;