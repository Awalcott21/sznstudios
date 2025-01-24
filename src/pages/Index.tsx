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
        <p className="text-foreground text-base mb-1 font-medium">
          NOW ACCEPTING PREORDERS, ORDERS SHIP IN 2-3 WEEKS!
        </p>
        <button
          onClick={() => setIsPreOrderModalOpen(true)}
          className="text-sm underline text-foreground/80 hover:text-white transition-colors"
        >
          Click here to learn more about the pre-order process
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