import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const books = [
  {
    src: "/lovable-uploads/e97927bb-0872-4d9a-bdd0-622cf4ab483f.png",
    alt: "Book of Psalms",
    price: 50,
  },
  {
    src: "/lovable-uploads/0746350a-9fe8-4b71-a71a-1ce25673d7cb.png",
    alt: "Book of Exodus",
    price: 50,
  },
  {
    src: "/lovable-uploads/4494f646-4185-4dc3-91f1-b5a8f280f749.png",
    alt: "Book of Genesis",
    price: 50,
  },
  {
    src: "/lovable-uploads/a536018a-ec04-46d1-a4d6-c1d3204c8576.png",
    alt: "Book of Proverbs",
    price: 50,
  },
];

export type CartItem = {
  type: 'book' | 'shirt';
  item: any;
  quantity: number;
};

const Books = () => {
  const { toast } = useToast();

  const addToCart = (book: typeof books[0]) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex(
      (item: CartItem) => item.type === 'book' && item.item.alt === book.alt
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        type: 'book',
        item: book,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: `${book.alt} has been added to your cart.`,
    });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {books.map((book) => (
          <div key={book.alt} className="flex flex-col items-center">
            <img
              src={book.src}
              alt={book.alt}
              className="w-full max-w-[250px] h-auto rounded-lg shadow-lg"
            />
            <p className="mt-2 font-semibold">{book.alt}</p>
            <p className="text-lg font-bold">${book.price}</p>
            <Button
              onClick={() => addToCart(book)}
              className="mt-2"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;