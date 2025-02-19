
import React, { useState } from "react";
import { Button } from "./ui/button";

interface BookCardProps {
  book: {
    src: string;
    backSrc?: string;
    alt: string;
    price: number;
    description?: string;
  };
  onAddToCart: () => void;
}

const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative cursor-pointer"
        onMouseEnter={() => book.backSrc && setShowBack(true)}
        onMouseLeave={() => book.backSrc && setShowBack(false)}
      >
        <img
          src={showBack && book.backSrc ? book.backSrc : book.src}
          alt={book.alt}
          className="w-full max-w-[250px] h-auto rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        />
      </div>
      <p className="mt-2 font-semibold text-center">{book.alt}</p>
      {book.description && (
        <p className="mt-1 text-sm text-muted-foreground text-center max-w-[250px]">
          {book.description}
        </p>
      )}
      <p className="text-lg font-bold">${book.price}</p>
      <Button
        onClick={onAddToCart}
        className="mt-2"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default BookCard;
