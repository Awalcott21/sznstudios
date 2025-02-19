
import React from "react";
import { useToast } from "@/hooks/use-toast";
import BookCard from "./BookCard";

const signatureItems = [
  {
    src: "/lovable-uploads/53dd68b2-9d38-490a-a2cd-4115b65a9012.png",
    alt: "Seasons Change God Remains - Black",
    price: 60,
  },
];

const SignatureCollection = () => {
  const { toast } = useToast();

  const addToCart = (item: typeof signatureItems[0]) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex(
      (cartItem: any) => cartItem.type === 'signature' && cartItem.item.alt === item.alt
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        type: 'signature',
        item: item,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart",
      description: `${item.alt} has been added to your cart.`,
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Signature Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {signatureItems.map((item) => (
          <BookCard 
            key={item.alt}
            book={item}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default SignatureCollection;
