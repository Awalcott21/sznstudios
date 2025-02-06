import React from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type CartItemProps = {
  item: {
    src: string;
    alt: string;
    price: number;
    size?: string;
  };
  type: 'book' | 'shirt';
  quantity: number;
  onRemove: () => void;
};

const CartItem = ({ item, type, quantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center space-x-4">
      <img 
        src={item.src} 
        alt={item.alt} 
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.alt}</h3>
        {type === 'shirt' && item.size && (
          <p className="text-sm text-gray-500">Size: {item.size}</p>
        )}
        <p className="text-sm">Quantity: {quantity}</p>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <p className="font-medium">${(item.price * quantity).toFixed(2)}</p>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRemove}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;