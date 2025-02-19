import React from "react";
import { useToast } from "@/hooks/use-toast";
import BookCard from "./BookCard";

const signatureItems = [
  {
    src: "/lovable-uploads/469d4cef-4eb6-483e-a468-a2e6193b4e9e.png",
    backSrc: "/lovable-uploads/e94ce0d0-7887-4d50-a0dc-92bfe39be33e.png",
    alt: "SZN's Change Camo Hoodie",
    price: 80,
    description: "Heavy-weight cotton blend hoodie with custom design. Features a relaxed fit with dropped shoulders and ribbed cuffs.",
  },
  {
    src: "/lovable-uploads/4810e530-231f-4c06-bb74-357a9d721554.png",
    backSrc: "/lovable-uploads/1bf62e1a-9411-4b35-a447-ce11a038e7ce.png",
    alt: "SZN's Change God Remains Shirt",
    price: 60,
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/3480baa9-9602-41f8-b45e-70a13fbd278a.png",
    backSrc: "/lovable-uploads/a5b9ce1d-1e65-4d17-a5fb-9bb7f16b8a5d.png",
    alt: "SZN's Change Camo Shirt",
    price: 60,
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
