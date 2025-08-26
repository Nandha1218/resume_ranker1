import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HR from "./pages/HR";
import { useEffect, useRef } from "react";

const queryClient = new QueryClient();

const AppBackground = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
      document.documentElement.style.setProperty("--parallax-x", x);
      document.documentElement.style.setProperty("--parallax-y", y);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-hero-dark" />
      <div className="absolute inset-0 bg-animated-gradient opacity-20 parallax-layer" />
      <div className="absolute inset-0 bg-spotlight opacity-40" />
      {location.pathname !== "/hr" && (
        <div className="absolute inset-0 bg-cursor-spotlight" />
      )}
      <div className="absolute inset-0 bg-stars opacity-25 parallax-layer" />
      <div className="absolute inset-0 bg-grid-dots opacity-8" />
      <div className="absolute inset-0 bg-noise opacity-10" />
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Place background inside Router to access location for per-route behavior */}
      <BrowserRouter>
        <AppBackground />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* JobSeeker route removed */}
          <Route path="/hr" element={<HR />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
