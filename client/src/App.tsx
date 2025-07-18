import React, { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DisclaimerModal from "@/components/disclaimer-modal";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always show disclaimer on every visit
    setShowDisclaimer(true);
    setIsLoading(false);
  }, []);

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Canada Access Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showDisclaimer && <DisclaimerModal onAccept={handleDisclaimerAccept} />}
        <div className={showDisclaimer ? "blur-sm pointer-events-none" : ""}>
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
