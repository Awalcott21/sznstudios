import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreOrderModal = ({ isOpen, onClose }: PreOrderModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4">Pre-Order Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">When will I receive my order?</h3>
            <p className="text-foreground">
              All preorder items are made to order and will be shipped within 2-3 weeks after the preorder period closes. You'll receive tracking information once your order is on its way.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Why is the delivery time 2-3 weeks?</h3>
            <p className="text-foreground">
              Our products are crafted with care and made to order to ensure high quality. This process takes time, and the 2-3 week window allows us to produce and ship your order without delays.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreOrderModal;