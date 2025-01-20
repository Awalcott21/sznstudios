import React from "react";

const shirts = [
  {
    src: "/lovable-uploads/405216d7-eb18-4083-ba41-b00257b9e05f.png",
    alt: "God in Every SZN Shirt",
  },
  {
    src: "/lovable-uploads/ce39f6ad-ede5-44c0-bf4a-749dc2b3ba27.png",
    alt: "Take Me to Church Shirt",
  },
  {
    src: "/lovable-uploads/b3942537-8cfd-4a65-932a-6dff883da150.png",
    alt: "How You Gon Win Shirt",
  },
  {
    src: "/lovable-uploads/6407d148-015e-4a2d-8add-bada252957f5.png",
    alt: "Holy Spirit Shirt",
  },
  {
    src: "/lovable-uploads/316f96da-cdad-48b2-85bd-a5022cd1eb83.png",
    alt: "Pray for Me Shirt",
  },
  {
    src: "/lovable-uploads/4d567db5-03f2-489d-8d34-e6499687006d.png",
    alt: "Ain't No Sunshine Shirt",
  },
  {
    src: "/lovable-uploads/a14fd6fe-bb58-4f46-b337-29a5e9b8b6c7.png",
    alt: "God in Every SZN Colorful Shirt",
  },
];

const ShirtGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shirts.map((shirt, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="animate-float">
              <img
                src={shirt.src}
                alt={shirt.alt}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShirtGrid;