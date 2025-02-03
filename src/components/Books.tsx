import React, { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const books = [
  {
    src: "/lovable-uploads/c3d212d1-945c-4ed9-b7c2-47b92dfcce47.png",
    alt: "Book of Psalms",
    price: 50,
  },
  {
    src: "/lovable-uploads/563902cb-0514-47ef-9b3d-c8a3df1effbc.png",
    alt: "Book of Exodus",
    price: 50,
  },
  {
    src: "/lovable-uploads/64cec346-7ea0-4d58-94e2-418e857cc59f.png",
    alt: "Book of Genesis",
    price: 50,
  },
  {
    src: "/lovable-uploads/a536018a-ec04-46d1-a4d6-c1d3204c8576.png",
    alt: "Book of Proverbs",
    price: 50,
  },
];

const Books = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<Array<{ book: typeof books[0]; quantity: number }>>([]);

  const addToCart = (book: typeof books[0]) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.book.alt === book.alt);
      if (existingItem) {
        return currentCart.map((item) =>
          item.book.alt === book.alt
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { book, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${book.alt} has been added to your cart.`,
    });
  };

  const removeFromCart = (bookAlt: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.book.alt !== bookAlt));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (bookAlt: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.book.alt === bookAlt ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

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

      {cart.length > 0 && (
        <div className="bg-slate-800 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.book.alt} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.book.src}
                    alt={item.book.alt}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.book.alt}</p>
                    <p>${item.book.price * item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.book.alt, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.book.alt, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.book.alt)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="border-t border-slate-600 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Total:</p>
                <p className="text-xl font-bold">${total}</p>
              </div>
              <Button className="w-full mt-4">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;