import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n";
import { MockAuthProvider, useMockAuth } from "@/contexts/MockAuthContext";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Trails from "./pages/Trails";
import TrailDetail from "./pages/TrailDetail";
import SubTrackDetail from "./pages/SubTrackDetail";
import ChallengeBasedModule from "./pages/ChallengeBasedModule";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useMockAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useMockAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/trails" element={<ProtectedRoute><Trails /></ProtectedRoute>} />
      <Route path="/trails/:trailId" element={<ProtectedRoute><TrailDetail /></ProtectedRoute>} />
      <Route path="/trails/:trailId/subtrack/:subTrackId" element={<ProtectedRoute><SubTrackDetail /></ProtectedRoute>} />
      <Route path="/trails/:trailId/subtrack/:subTrackId/module/:moduleId" element={<ProtectedRoute><ChallengeBasedModule /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <MockAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </MockAuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
