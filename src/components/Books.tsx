
import React from "react";
import { useToast } from "@/hooks/use-toast";
import BookCard from "./BookCard";

const books: {
  src: string;
  alt: string;
  price: number;
}[] = [];

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
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8 place-items-center">
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
