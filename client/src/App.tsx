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
    // Use a more robust approach to detect refresh vs new visit
    const disclaimerShownThisSession = sessionStorage.getItem('disclaimerShownThisSession');
    
    if (!disclaimerShownThisSession) {
      // This is the first load in this session (new visit, not refresh)
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
      
      // Show disclaimer every other visit (on even visit numbers: 0, 2, 4, etc.)
      if (visitCount % 2 === 0) {
        setShowDisclaimer(true);
        sessionStorage.setItem('disclaimerShownThisSession', 'true');
      } else {
        // Even if we don't show disclaimer, mark session as visited
        sessionStorage.setItem('disclaimerShownThisSession', 'true');
      }
    }
    // If disclaimerShownThisSession exists, don't show disclaimer again this session
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
