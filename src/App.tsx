import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [paypalConfig, setPaypalConfig] = useState<{ clientId: string } | null>(null);

  useEffect(() => {
    const fetchPayPalConfig = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-paypal-client-id');
        if (error) {
          console.error('Error fetching PayPal config:', error);
          return;
        }
        setPaypalConfig(data);
      } catch (error) {
        console.error('Error fetching PayPal config:', error);
      }
    };

    fetchPayPalConfig();
  }, []);

  if (!paypalConfig) {
    return <div>Loading...</div>; // Or your preferred loading component
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider options={{ 
        clientId: paypalConfig.clientId,
        currency: "USD",
        intent: "capture",
        components: "buttons,hosted-fields",
        vault: true,
        enableFunding: ["card", "venmo", "applepay"]
      }}>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PayPalScriptProvider>
    </QueryClientProvider>
  );
};

export default App;