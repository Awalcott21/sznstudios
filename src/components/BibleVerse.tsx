
import React, { useState, useEffect } from "react";

const verses = [
  "To everything there is a season, and a time to every purpose under the heaven:",
  "A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted;",
  "A time to kill, and a time to heal; a time to break down, and a time to build up;",
  "A time to weep, and a time to laugh; a time to mourn, and a time to dance;",
  "A time to cast away stones, and a time to gather stones together; a time to embrace, and a time to refrain from embracing;",
  "A time to get, and a time to lose; a time to keep, and a time to cast away;",
  "A time to rend, and a time to sew; a time to keep silence, and a time to speak;",
  "A time to love, and a time to hate; a time of war, and a time of peace.",
];

const BibleVerse = () => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    }, 8000); // Changed from 4000 to 8000 ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-12 px-4">
      <div className="container mx-auto text-center">
        <p className="font-display text-heading-md md:text-heading-lg text-foreground italic transition-opacity duration-500 max-w-4xl mx-auto">
          {verses[currentVerseIndex]}
        </p>
        <p className="text-body-sm text-foreground/60 mt-4 font-medium uppercase tracking-wide">
          Ecclesiastes 3:1-8
        </p>
      </div>
    </div>
  );
};

export default BibleVerse;
