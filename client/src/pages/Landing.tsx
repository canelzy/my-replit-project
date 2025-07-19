import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [isNarrating, setIsNarrating] = useState(false);

  const narrateText = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const text = `
        Support for Vulnerable Canadians.
        
        Canada is home to over 170,000 nonprofit organizations, including 85,000 registered charities and many grassroots groups, working tirelessly to support those in need.
        
        Backed by nearly 400 billion dollars in annual funding from governments, donors, and foundations, these organizations provide essential services like mental health care, housing support, food security, and employment programs.
        
        Whether you're experiencing financial hardship, health challenges, or social isolation, you are not alone.
        
        Canada's extensive nonprofit network is equipped to help. Reach out to a local charity or community group. Support is available, and hope is closer than you think.
      `;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsNarrating(true);
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    }
  };

  useEffect(() => {
    // Start narration automatically when page loads
    const narrationTimeout = setTimeout(() => {
      narrateText();
    }, 1000); // Delay to ensure page is fully loaded

    const timeout = setTimeout(() => {
      setLocation("/home");
    }, 10000); // 10 seconds

    return () => {
      clearTimeout(narrationTimeout);
      clearTimeout(timeout);
      stopNarration();
    };
  }, [setLocation]);

  const handleContinue = () => {
    setLocation("/home");
  };

  const handleSkip = () => {
    setLocation("/home");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12 text-center">
      <section>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Support for Vulnerable Canadians
        </h1>
        <p className="text-lg text-gray-700">
          Canada is home to over 170,000 nonprofit organizations—including 85,000 registered charities and many grassroots groups—working tirelessly to support those in need.
        </p>
      </section>

      <section className="text-gray-700 space-y-4 text-lg">
        <p>
          Backed by nearly $400 billion in annual funding from governments, donors, and foundations, these organizations provide essential services like mental health care, housing support, food security, and employment programs.
        </p>
        <p>
          Whether you're experiencing financial hardship, health challenges, or social isolation, you are not alone.
        </p>
        <p>
          Canada's extensive nonprofit network is equipped to help. Reach out to a local charity or community group—support is available, and hope is closer than you think.
        </p>
      </section>

      {/* Audio Controls */}
      <section className="flex justify-center gap-3 mb-8">
        <button
          onClick={narrateText}
          disabled={isNarrating}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i className="fas fa-volume-up"></i>
          {isNarrating ? 'Reading...' : 'Listen'}
        </button>
        <button
          onClick={stopNarration}
          disabled={!isNarrating}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i className="fas fa-stop"></i>
          Stop
        </button>
      </section>

      <section className="flex justify-center gap-4">
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition"
        >
          Continue
        </button>
        <button
          onClick={handleSkip}
          className="text-gray-600 underline hover:text-gray-800 transition"
        >
          Skip
        </button>
      </section>

      <p className="text-sm text-gray-400 text-center">
        Automatically continuing in 10 seconds...
      </p>
    </main>
  );
}