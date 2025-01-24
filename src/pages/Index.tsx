import React, { useState } from "react";
import Header from "../components/Header";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";
import PreOrderModal from "../components/PreOrderModal";

const Index = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BibleVerse />
      <div className="w-full py-4 bg-slate-800 text-center">
        <p className="text-foreground text-lg mb-2">
          NOW ACCEPTING PREORDERS, ORDERS SHIP IN 2-3 WEEKS!
        </p>
        <button
          onClick={() => setIsPreOrderModalOpen(true)}
          className="text-sm underline text-foreground hover:text-white transition-colors"
        >
          Click here to learn more about the pre-order process
        </button>
      </div>
      <ShirtGrid />
      <PreOrderModal
        isOpen={isPreOrderModalOpen}
        onClose={() => setIsPreOrderModalOpen(false)}
      />
    </div>
  );
};

export default Index;