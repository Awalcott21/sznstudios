import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={{ 
      clientId: "ATRxmHVGn_KC48wjB7zUk2TphxyKeurrmhAZW7lu2Db2FhX05DS892Gzqso0uk9wfCDT9cq_U3WISFlI",
      currency: "USD",
      intent: "capture",
      components: "buttons,hosted-fields",
      dataClientToken: "EJxbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

export default App;