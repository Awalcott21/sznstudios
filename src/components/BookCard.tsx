import React from "react";
import { Button } from "./ui/button";

interface BookCardProps {
  book: {
    src: string;
    alt: string;
    price: number;
  };
  onAddToCart: () => void;
}

const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={book.src}
        alt={book.alt}
        className="w-full max-w-[250px] h-auto rounded-lg shadow-lg"
      />
      <p className="mt-2 font-semibold">{book.alt}</p>
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