import React from "react";
import Header from "../components/Header";
import BibleVerse from "../components/BibleVerse";
import ShirtGrid from "../components/ShirtGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BibleVerse />
      <ShirtGrid />
    </div>
  );
};

export default Index;