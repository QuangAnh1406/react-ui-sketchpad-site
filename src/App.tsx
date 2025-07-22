
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampaignDetail from "./pages/CampaignDetail";
import CustomerDetail from "./pages/CustomerDetail";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Prospects from "./pages/Prospects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaign/:campaignName" element={<CampaignDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:customerName" element={<CustomerDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:userName" element={<UserDetail />} />
          <Route path="/prospects" element={<Prospects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
