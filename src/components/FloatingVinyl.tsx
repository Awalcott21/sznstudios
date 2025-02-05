import React, { useState, useRef } from 'react';

const FloatingVinyl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div 
        className={`cursor-pointer transition-transform duration-500 ${
          isPlaying ? 'animate-spin' : 'hover:scale-110'
        }`}
        onClick={togglePlay}
      >
        <img
          src="/lovable-uploads/vinyl-record.png"
          alt="Vinyl Record"
          className="w-24 h-24 rounded-full shadow-lg"
        />
      </div>
      <audio ref={audioRef} src="/lovable-uploads/gifted-hands.mp3" />
    </div>
  );
};

export default FloatingVinyl;