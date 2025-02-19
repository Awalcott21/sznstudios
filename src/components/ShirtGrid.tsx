
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
  {
    frontSrc: "/lovable-uploads/316f96da-cdad-48b2-85bd-a5022cd1eb83.png",
    backSrc: "/lovable-uploads/93c1e241-e8ec-41fc-b50c-49ef370c5c48.png",
    alt: "Faith Over Fear Hoodie - Black",
    description: "13 oz heavyweight fleece hoodie. Front pouch pocket, drawstrings, and ribbed cuffs. Features 'Faith Over Fear' design.",
    price: 75,
  },
  {
    frontSrc: "/lovable-uploads/4494f646-4185-4dc3-91f1-b5a8f280f749.png",
    backSrc: "/lovable-uploads/405216d7-eb18-4083-ba41-b00257b9e05f.png",
    alt: "SZN Classic Logo T-Shirt - White",
    description: "6.0 oz 100% cotton classic fit tee. Pre-shrunk, comfortable crew neck. Features our classic logo design.",
    price: 35,
  },
  {
    frontSrc: "/lovable-uploads/67063bc4-a0c9-402e-8fc9-3aa55a44301b.png",
    backSrc: "/lovable-uploads/64cec346-7ea0-4d58-94e2-418e857cc59f.png",
    alt: "Limited Edition Faith Tee - Black",
    description: "Limited edition faith-inspired design. 6.0 oz 100% cotton, relaxed fit. Features custom artwork.",
    price: 40,
  },
  {
    frontSrc: "/lovable-uploads/ab72aab9-da5a-4c57-91a8-79fa78f96c5f.png",
    backSrc: "/lovable-uploads/e97927bb-0872-4d9a-bdd0-622cf4ab483f.png",
    alt: "Season of Purpose Hoodie - Grey",
    description: "Premium heavyweight fleece hoodie. Kangaroo pocket, adjustable hood. Features 'Season of Purpose' messaging.",
    price: 70,
  }
];

const ShirtGrid = () => {
  const [selectedShirt, setSelectedShirt] = useState<(typeof shirts)[0] | null>(
    null
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Signature Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                alt={`${shirt.alt}`}
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
