import React from "react";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Signature Collection",
    image: "/lovable-uploads/4810e530-231f-4c06-bb74-357a9d721554.png",
    description: "Premium essentials with purpose"
  },
  {
    title: "Reflection SZN",
    image: "/lovable-uploads/405216d7-eb18-4083-ba41-b00257b9e05f.png",
    description: "Where faith meets contemporary design"
  },
  {
    title: "Limited Edition",
    image: "/lovable-uploads/3480baa9-9602-41f8-b45e-70a13fbd278a.png",
    description: "Exclusive drops with meaning"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-display-sm md:text-display-md text-center mb-12 text-foreground">
          Featured Collections
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="font-display text-heading-sm mb-2">{collection.title}</h3>
                <p className="text-body-base text-muted-foreground">{collection.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
