
import React, { useState } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import FeaturedCollections from "../components/FeaturedCollections";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";
import PreOrderModal from "../components/PreOrderModal";
import Books from "../components/Books";
import SignatureCollection from "../components/SignatureCollection";
import Footer from "../components/Footer";

const Index = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroBanner />
        
        <div className="py-16 bg-muted">
          <BibleVerse />
        </div>

        <FeaturedCollections />
        
        <div className="container mx-auto px-4 py-16">
          <Books />
        </div>
        
        <div className="bg-muted py-16">
          <SignatureCollection />
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Reflection SZN</h2>
          <ShirtGrid />
        </div>
        
        <PreOrderModal
          isOpen={isPreOrderModalOpen}
          onClose={() => setIsPreOrderModalOpen(false)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
