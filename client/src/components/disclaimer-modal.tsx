import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, FileText, ExternalLink } from "lucide-react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    localStorage.setItem('canada-access-hub-disclaimer-accepted', 'true');
    setIsVisible(false);
    onAccept();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl font-bold">Important Disclaimer</CardTitle>
                <p className="text-red-100 mt-1">Canada Access Hub - Government Services Directory</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Third-Party Service Directory</h3>
                <p className="text-gray-700 leading-relaxed">
                  This website is an <strong>independent directory</strong> that provides links to official Canadian government services and resources. We are not affiliated with, endorsed by, or sponsored by the Government of Canada or any of its agencies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Information Accuracy</h3>
                <p className="text-gray-700 leading-relaxed">
                  While we strive to maintain accurate and up-to-date information, links and service details may change without notice. Always verify information directly with official government sources before taking action.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ExternalLink className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">External Links</h3>
                <p className="text-gray-700 leading-relaxed">
                  This directory contains links to external websites. We are not responsible for the content, privacy policies, or practices of these external sites. Use at your own discretion.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                By clicking "Accept & Continue", you acknowledge that you have read and understood this disclaimer and agree to use this directory at your own risk.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleAccept}
                className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
              >
                Accept & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}