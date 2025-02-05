import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  // Get PayPal client ID from Supabase secrets
  const clientId = await supabase.functions.invoke('get-paypal-client-id');

  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider options={{ 
        clientId: clientId.data.clientId,
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