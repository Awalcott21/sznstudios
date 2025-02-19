
import React, { useState } from "react";
import ShirtModal from "./ShirtModal";

const shirts = [
  {
    frontSrc: "/lovable-uploads/53dd68b2-9d38-490a-a2cd-4115b65a9012.png",
    backSrc: "/lovable-uploads/a59a6167-e63b-4add-a173-a8bcd80808b9.png",
    alt: "SZN's Change God Remains - Black",
    description: "Signature Line - 7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Features our brand slogan.",
    price: 60,
  },
  {
    frontSrc: "/lovable-uploads/707e0bd4-34d9-43d9-8aba-5d3b0dd600e5.png",
    backSrc: "/lovable-uploads/c858fe7c-7895-4277-8ef6-652362583d49.png",
    alt: "SZN's Change God Remains - Camo",
    description: "Signature Line - 7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Features our brand slogan in camo pattern.",
    price: 60,
  },
];

const ShirtGrid = () => {
  const [selectedShirt, setSelectedShirt] = useState<(typeof shirts)[0] | null>(
    null
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Signature Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shirts.map((shirt, index) => (
          <div
            key={index}
            className="relative group cursor-pointer w-full aspect-square flex items-center justify-center"
            onClick={() => setSelectedShirt(shirt)}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="animate-float transform transition-all duration-300 group-hover:scale-105 w-full max-w-[350px] relative">
              <img
                src={shirt.frontSrc}
                alt={`${shirt.alt} - Front`}
                className="w-full h-full object-contain transition-all duration-300 rounded-lg shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2"
              />
            </div>
          </div>
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
