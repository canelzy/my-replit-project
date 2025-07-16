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
