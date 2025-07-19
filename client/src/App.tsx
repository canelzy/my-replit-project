import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DisclaimerModal from "@/components/disclaimer-modal";
import Landing from "@/pages/Landing";
import Home from "@/pages/home";
import Privacy from "@/pages/privacy";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    // Check if user has seen landing page
    const hasSeenLanding = localStorage.getItem('hasSeenLanding');
    
    // If on root path and hasn't seen landing, redirect to landing
    if (location === '/' && !hasSeenLanding) {
      setLocation('/landing');
    }
    // If on root path and has seen landing, redirect to home
    else if (location === '/' && hasSeenLanding) {
      setLocation('/home');
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/landing" component={Landing} />
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Show disclaimer every time the app opens or refreshes
    setShowDisclaimer(true);
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
