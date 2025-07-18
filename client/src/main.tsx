import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Edge browser compatibility polyfills
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    return this.indexOf(searchElement, fromIndex) !== -1;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Safe DOM element access for Edge
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Register service worker for PWA functionality (Edge compatible)
if ('serviceWorker' in navigator && navigator.serviceWorker) {
  try {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered!');
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  } catch (error) {
    console.log('Service Worker not supported in this browser');
  }
}

// Detect Edge side panel context (Edge compatible)
function detectEdgeSidePanel() {
  try {
    const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const isNarrowWidth = window.innerWidth <= 500;
    
    if (isStandalone && isNarrowWidth) {
      document.body.classList.add('edge-side-panel');
      console.log('Running in Edge side panel mode');
    }
  } catch (error) {
    // Fallback for older browsers
    console.log('matchMedia not supported');
  }
}

// Check on load and resize
window.addEventListener('load', detectEdgeSidePanel);
window.addEventListener('resize', detectEdgeSidePanel);

// Handle file opening when app is launched as file handler (Edge compatible)
function handleFileHandlerLaunch() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const handler = urlParams.get('handler');
    
    if (handler) {
      console.log('Launched as file handler: ' + handler);
      
      // Handle different file types
      if (handler === 'tax-form') {
        // Show tax-related resources
        showTaxResources();
      } else if (handler === 'government-doc') {
        // Show general government document resources
        showGovernmentDocResources();
      }
    }
  } catch (error) {
    // Fallback for browsers without URLSearchParams support
    console.log('URLSearchParams not supported');
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
