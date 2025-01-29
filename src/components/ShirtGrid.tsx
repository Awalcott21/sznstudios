import React, { useState } from "react";
import ShirtModal from "./ShirtModal";

const shirts = [
  {
    src: "/lovable-uploads/405216d7-eb18-4083-ba41-b00257b9e05f.png",
    alt: "God in Every SZN Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/ce39f6ad-ede5-44c0-bf4a-749dc2b3ba27.png",
    alt: "Take Me to Church Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/b3942537-8cfd-4a65-932a-6dff883da150.png",
    alt: "How You Gon Win Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/6407d148-015e-4a2d-8add-bada252957f5.png",
    alt: "Holy Spirit Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/316f96da-cdad-48b2-85bd-a5022cd1eb83.png",
    alt: "Pray for Me Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/4d567db5-03f2-489d-8d34-e6499687006d.png",
    alt: "Ain't No Sunshine Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/a14fd6fe-bb58-4f46-b337-29a5e9b8b6c7.png",
    alt: "God in Every SZN Colorful Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/67063bc4-a0c9-402e-8fc9-3aa55a44301b.png",
    alt: "Con Dios Blue Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
  {
    src: "/lovable-uploads/f08ebfca-8ec9-4bf6-b321-981ea5ac70ae.png",
    alt: "Con Dios Pink Shirt",
    description: "7.6 oz pigment-dyed 100% cotton, unisex heavyweight boxy tee. Oversized fit, crew neck, double-stitched. Gets softer with wear, 6% shrinkage.",
  },
];

const ShirtGrid = () => {
  const [selectedShirt, setSelectedShirt] = useState<(typeof shirts)[0] | null>(
    null
  );

  return (
    <div className="container mx-auto px-4 py-12">
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
            <div className="animate-float transform transition-all duration-300 group-hover:scale-105 w-full max-w-[250px]">
              <img
                src={shirt.src}
                alt={shirt.alt}
                className="w-full h-full object-contain transition-all duration-300 rounded-lg shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transform perspective-1000 group-hover:rotate-y-12"
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