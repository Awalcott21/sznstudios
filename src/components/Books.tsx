import React from "react";
import { useToast } from "@/hooks/use-toast";
import BookCard from "./BookCard";

const books = [
  {
    src: "/lovable-uploads/93c1e241-e8ec-41fc-b50c-49ef370c5c48.png",
    alt: "Book of Psalms",
    price: 50,
  },
  {
    src: "/lovable-uploads/ab72aab9-da5a-4c57-91a8-79fa78f96c5f.png",
    alt: "Book of Exodus",
    price: 50,
  },
  {
    src: "/lovable-uploads/eed50cbd-46f6-46df-aaa0-5196b441f723.png",
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
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {books.map((book) => (
          <BookCard 
            key={book.alt}
            book={book}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;