
import React, { useState } from "react";
import Header from "../components/Header";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";
import PreOrderModal from "../components/PreOrderModal";
import Books from "../components/Books";
import SignatureCollection from "../components/SignatureCollection";
import Footer from "../components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [activeSizeGuide, setActiveSizeGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src="/lovable-uploads/410cc1f9-28ee-4a4f-8140-5ccfe6178335.png" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">Elevate Your Faith</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl px-4">Clothing that speaks to your spirit and reflects your journey</p>
          <button
            onClick={() => setIsPreOrderModalOpen(true)}
            className="px-8 py-4 text-lg font-medium text-white transition-all transform hover:scale-105 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl"
          >
            Pre-Orders Now Open →
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Bible Verse with subtle styling */}
        <div className="max-w-4xl mx-auto mb-16 opacity-90">
          <BibleVerse />
        </div>

        {/* Signature Collection with enhanced presentation */}
        <div className="mb-24">
          <SignatureCollection />
        </div>

        {/* Size Guide Modal Trigger */}
        <div className="text-center mb-16">
          <button
            onClick={() => setActiveSizeGuide(!activeSizeGuide)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-foreground/90 transition-all border border-slate-700 rounded-md bg-slate-800/50 hover:bg-slate-700/50"
          >
            Size Guide
          </button>
          
          {activeSizeGuide && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-slate-800 p-8 rounded-lg max-w-2xl w-full max-h-[80vh] relative">
                <button 
                  onClick={() => setActiveSizeGuide(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-4 text-white">Size Guide</h3>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-sm text-white">
                      <div className="font-bold">Size</div>
                      <div className="font-bold">Chest (in)</div>
                      <div className="font-bold">Length (in)</div>
                      <div className="font-bold">Sleeve (in)</div>
                      <div className="font-bold">Shoulder (in)</div>
                      
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <>
                          <div>{size}</div>
                          <div>{38 + (['S', 'M', 'L', 'XL'].indexOf(size) * 2)}</div>
                          <div>{28 + (['S', 'M', 'L', 'XL'].indexOf(size))}</div>
                          <div>{24 + (['S', 'M', 'L', 'XL'].indexOf(size))}</div>
                          <div>{17 + (['S', 'M', 'L', 'XL'].indexOf(size))}</div>
                        </>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="text-white">
                      <h4 className="font-bold mb-2">Measuring Guide</h4>
                      <p className="text-sm text-gray-300">
                        For the best fit, measure yourself and compare to the size chart above. For questions about sizing, please contact us.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-white">Reflection SZN</h2>
        <ShirtGrid />
      </div>

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
