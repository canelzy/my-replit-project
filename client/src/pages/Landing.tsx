import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Auto-continue after 10 seconds
          localStorage.setItem('hasSeenLanding', 'true');
          setLocation('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setLocation]);

  const handleContinue = () => {
    localStorage.setItem('hasSeenLanding', 'true');
    setLocation('/home');
  };

  const handleSkip = () => {
    setLocation('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <i className="fas fa-maple-leaf text-white text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Canada Access Hub
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
            Your Gateway to Canadian Services & Support
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Canada's Comprehensive Resource Network
          </h2>
          
          <div className="text-left space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Canada Access Hub serves as your central directory for navigating the extensive network of government services, 
              non-profit organizations, and community resources available across Canada. Our platform connects you with essential 
              services that support newcomers, families, and individuals in building successful lives in Canada.
            </p>
            
            <p className="text-lg leading-relaxed">
              From employment and settlement services to healthcare, education, and legal support, our comprehensive directory 
              features over 1,000 trusted organizations and government agencies. Whether you're seeking immigration assistance, 
              language training, housing support, or professional development opportunities, we've organized these vital resources 
              into easily searchable categories.
            </p>
            
            <p className="text-lg leading-relaxed">
              Our directory includes specialized support for diverse communities, LGBTQ+ services, youth programs, women's resources, 
              and culturally specific organizations serving African, Asian, Indigenous, and other communities across Canada. 
              Each listing provides complete contact information, service descriptions, and direct links to help you access 
              the support you need.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <i className="fas fa-info-circle mr-2"></i>
                Start exploring Canada's support network and discover the resources available to help you thrive in your community.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleContinue}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <i className="fas fa-arrow-right mr-2"></i>
            Continue to Directory
          </Button>
          
          <Button 
            onClick={handleSkip}
            variant="outline"
            className="border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200"
          >
            <i className="fas fa-skip-forward mr-2"></i>
            Skip Introduction
          </Button>
        </div>

        {/* Auto-continue Notice */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <i className="fas fa-clock mr-2"></i>
            Automatically continuing in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}