import React from "react";

type CartItemProps = {
  item: {
    src: string;
    alt: string;
    price: number;
    size?: string;
  };
  type: 'book' | 'shirt';
  quantity: number;
};

const CartItem = ({ item, type, quantity }: CartItemProps) => {
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
      <div className="text-right">
        <p className="font-medium">${(item.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;