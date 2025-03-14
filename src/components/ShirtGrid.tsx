
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Expand } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import ShirtModal from "./ShirtModal";

const shirts = [
  {
    src: "/lovable-uploads/405216d7-eb18-4083-ba41-b00257b9e05f.png",
    alt: "God in Every SZN Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/ce39f6ad-ede5-44c0-bf4a-749dc2b3ba27.png",
    alt: "Take Me to Church Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/b3942537-8cfd-4a65-932a-6dff883da150.png",
    alt: "How You Gon Win Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/6407d148-015e-4a2d-8add-bada252957f5.png",
    alt: "Holy Spirit Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/316f96da-cdad-48b2-85bd-a5022cd1eb83.png",
    alt: "Pray for Me Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/4d567db5-03f2-489d-8d34-e6499687006d.png",
    alt: "Ain't No Sunshine Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/a14fd6fe-bb58-4f46-b337-29a5e9b8b6c7.png",
    alt: "God in Every SZN Colorful Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/67063bc4-a0c9-402e-8fc9-3aa55a44301b.png",
    alt: "Con Dios Blue Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
  {
    src: "/lovable-uploads/f08ebfca-8ec9-4bf6-b321-981ea5ac70ae.png",
    alt: "Con Dios Pink Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
    price: 60,
  },
];

const ShirtGrid = () => {
  const [selectedShirt, setSelectedShirt] = useState<(typeof shirts)[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleQuickAdd = (shirt: typeof shirts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.push({
      type: 'shirt',
      item: {
        ...shirt,
        size: 'L' // Default size for quick add
      },
      quantity: 1
    });
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart",
      description: `${shirt.alt} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shirts.map((shirt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => index < 6 && setSelectedShirt(shirt)}
          >
            <div className={`relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg ${index >= 6 ? 'blur-[2px]' : ''}`}>
              <img
                src={shirt.src}
                alt={shirt.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {hoveredIndex === index && index < 6 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white text-black hover:bg-white/90"
                    onClick={(e) => handleQuickAdd(shirt, e)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white text-black hover:bg-white/90"
                  >
                    <Expand className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {index >= 6 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <span className="text-white text-2xl font-bold px-6 py-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 shadow-xl">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-medium text-lg">{shirt.alt}</h3>
              <p className="text-muted-foreground">$60.00</p>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedShirt && (
        <ShirtModal
          isOpen={!!selectedShirt}
          onClose={() => setSelectedShirt(null)}
          shirt={selectedShirt}
        />
      )}
    </div>
  );
};

export default ShirtGrid;
