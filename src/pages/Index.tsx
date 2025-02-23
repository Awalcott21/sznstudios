
import React, { useState } from "react";
import Header from "../components/Header";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";
import PreOrderModal from "../components/PreOrderModal";
import Books from "../components/Books";
import SignatureCollection from "../components/SignatureCollection";
import Footer from "../components/Footer";

const Index = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="mt-24">
        <BibleVerse />
      </div>
      <div className="w-full py-3 text-center">
        <button
          onClick={() => setIsPreOrderModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-foreground/90 hover:text-white transition-all border border-slate-700 hover:border-slate-600 rounded-md bg-gradient-to-r from-slate-800 to-slate-800 hover:from-slate-700 hover:to-slate-700"
        >
          Pre-Orders Now Open →
        </button>
      </div>
      <Books />
      <SignatureCollection />
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Reflection SZN</h2>
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
