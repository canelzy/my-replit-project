import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered!'))
    .catch(error => console.log('Service Worker registration failed:', error));
}

// Detect Edge side panel context
function detectEdgeSidePanel() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isNarrowWidth = window.innerWidth <= 500;
  
  if (isStandalone && isNarrowWidth) {
    document.body.classList.add('edge-side-panel');
    console.log('Running in Edge side panel mode');
  }
}

// Check on load and resize
window.addEventListener('load', detectEdgeSidePanel);
window.addEventListener('resize', detectEdgeSidePanel);

// Handle file opening when app is launched as file handler
function handleFileHandlerLaunch() {
  const urlParams = new URLSearchParams(window.location.search);
  const handler = urlParams.get('handler');
  
  if (handler) {
    console.log(`Launched as file handler: ${handler}`);
    
    // Handle different file types
    if (handler === 'tax-form') {
      // Show tax-related resources
      showTaxResources();
    } else if (handler === 'government-doc') {
      // Show general government document resources
      showGovernmentDocResources();
    }
  }
}

function showTaxResources() {
  // Focus on tax-related category and show relevant resources
  const taxSection = document.querySelector('[data-category="Taxes & Benefits"]');
  if (taxSection) {
    taxSection.scrollIntoView({ behavior: 'smooth' });
    // Add visual highlight
    taxSection.classList.add('bg-yellow-50', 'border-2', 'border-yellow-300');
  }
}

function showGovernmentDocResources() {
  // Show general government resources
  const generalSection = document.querySelector('[data-category="General Government"]');
  if (generalSection) {
    generalSection.scrollIntoView({ behavior: 'smooth' });
    generalSection.classList.add('bg-blue-50', 'border-2', 'border-blue-300');
  }
}

// Check for file handler launch on page load
window.addEventListener('load', handleFileHandlerLaunch);
