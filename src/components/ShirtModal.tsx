
import React, { useState } from "react";
import { Share2, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ShirtModalProps {
  isOpen: boolean;
  onClose: () => void;
  shirt: {
    src: string;
    backSrc?: string;
    alt: string;
    description: string;
  };
}

const ShirtModal = ({ isOpen, onClose, shirt }: ShirtModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showingBack, setShowingBack] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex(
      (item: any) => item.type === 'shirt' && item.item.alt === shirt.alt && item.item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        type: 'shirt',
        item: {
          ...shirt,
          price: 60,
          size: selectedSize
        },
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart",
      description: `${shirt.alt} (Size: ${selectedSize}) has been added to your cart.`,
    });
    onClose();
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: shirt.alt,
        text: "Check out this awesome shirt from SZN Studios!",
        url: window.location.href,
      });
    } catch (err) {
      console.log("Sharing failed", err);
    }
  };

  const bibleVerse = "\"For I know the plans I have for you\" - Jeremiah 29:11";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{shirt.alt}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={showingBack ? "back" : "front"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={showingBack && shirt.backSrc ? shirt.backSrc : shirt.src}
                alt={`${shirt.alt} ${showingBack ? 'Back' : 'Front'}`}
                className="w-full h-auto rounded-lg"
              />
            </AnimatePresence>
            {shirt.backSrc && (
              <Button
                variant="secondary"
                className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setShowingBack(!showingBack)}
              >
                Show {showingBack ? 'Front' : 'Back'}
              </Button>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">{shirt.description}</p>
              <p className="text-sm italic text-muted-foreground">{bibleVerse}</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Size</label>
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">Small</SelectItem>
                  <SelectItem value="M">Medium</SelectItem>
                  <SelectItem value="L">Large</SelectItem>
                  <SelectItem value="XL">X-Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">$60.00</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="px-8"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShirtModal;
