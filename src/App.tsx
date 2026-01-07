import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Trails from "./pages/Trails";
import TrailDetail from "./pages/TrailDetail";
import SubTrackDetail from "./pages/SubTrackDetail";
import ChallengeBasedModule from "./pages/ChallengeBasedModule";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
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
          <Route path="/trails" element={<Trails />} />
          <Route path="/trails/:trailId" element={<TrailDetail />} />
          <Route path="/trails/:trailId/subtrack/:subTrackId" element={<SubTrackDetail />} />
          <Route path="/trails/:trailId/subtrack/:subTrackId/module/:moduleId" element={<ChallengeBasedModule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
