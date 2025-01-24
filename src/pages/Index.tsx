import React, { useState } from "react";
import Header from "../components/Header";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";
import PreOrderModal from "../components/PreOrderModal";
import Footer from "../components/Footer";

const Index = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <BibleVerse />
      <div className="w-full py-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-center border-y border-slate-600">
        <button
          onClick={() => setIsPreOrderModalOpen(true)}
          className="text-foreground/90 hover:text-white transition-colors text-base font-medium"
        >
          Pre-Orders Now Open →
        </button>
      </div>
      <ShirtGrid />
      <PreOrderModal
        isOpen={isPreOrderModalOpen}
        onClose={() => setIsPreOrderModalOpen(false)}
      />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Index;