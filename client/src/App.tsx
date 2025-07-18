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
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Check if this is a refresh or a new visit
    const isRefresh = sessionStorage.getItem('hasVisited');
    
    if (!isRefresh) {
      // This is a new visit (not a refresh)
      sessionStorage.setItem('hasVisited', 'true');
      
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
      // Show disclaimer every other visit (on even visit numbers: 0, 2, 4, etc.)
      if (visitCount % 2 === 0) {
        setShowDisclaimer(true);
      }
    }
    // If isRefresh exists, don't show disclaimer (it's a page refresh)
  }, []);

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

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
