
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ShirtModal from "./ShirtModal";

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
  const [selectedItem, setSelectedItem] = useState<(typeof signatureItems)[0] | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Signature Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {signatureItems.map((item) => (
          <div
            key={item.alt}
            className="relative group cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex flex-col items-center">
              <div 
                className="relative cursor-pointer"
                onMouseEnter={() => {/* hover handling will be done by ShirtModal */}}
                onMouseLeave={() => {/* hover handling will be done by ShirtModal */}}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full max-w-[250px] h-auto rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                />
              </div>
              <p className="mt-2 font-semibold text-center">{item.alt}</p>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <ShirtModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          shirt={selectedItem}
        />
      )}
    </div>
  );
};

export default SignatureCollection;
