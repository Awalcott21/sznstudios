import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shirtDetails: {
    src: string;
    alt: string;
    size: string;
  };
}

const CustomerDetailsModal = ({
  isOpen,
  onClose,
  shirtDetails,
}: CustomerDetailsModalProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", { ...values, shirtDetails });
    setFormSubmitted(true);
  };

  const createOrder = (data: any, actions: any) => {
    // Set price based on shirt
    const price = shirtDetails.alt === "God in Every SZN Shirt" ? "1.00" : "60.00";
    
    return actions.order.create({
      purchase_units: [{
        description: `${shirtDetails.alt} - Size: ${shirtDetails.size}`,
        amount: {
          value: price
        }
      }]
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      toast({
        title: "Order Successful!",
        description: `Thank you for your purchase, ${details.payer.name.given_name}! You will receive an email confirmation shortly.`,
      });
      console.log('Transaction details:', details);
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Customer Details
          </DialogTitle>
        </DialogHeader>
        {!formSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Continue to Payment</Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">
                Total: ${shirtDetails.alt === "God in Every SZN Shirt" ? "1.00" : "60.00"}
              </p>
            </div>
            <div id="paypal-button-container">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "vertical" }}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;