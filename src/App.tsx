import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Histoire from "./pages/Histoire";
import Programme from "./pages/Programme";
import Lieux from "./pages/Lieux";
import Hebergement from "./pages/Hebergement";
import RSVP from "./pages/RSVP";
import Infos from "./pages/Infos";
import Galerie from "./pages/Galerie";
import Cadeaux from "./pages/Cadeaux";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminSignup from "./pages/AdminSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/histoire" element={<Histoire />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/lieux" element={<Lieux />} />
          <Route path="/hebergement" element={<Hebergement />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/infos" element={<Infos />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/cadeaux" element={<Cadeaux />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
