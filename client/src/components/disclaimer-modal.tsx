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
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-red-800">Important Disclaimer</h3>
                  <p className="text-red-700 leading-relaxed">
                    This app is <strong>not affiliated with or endorsed by any government agency</strong>. It provides publicly available information for informational purposes only.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Who We Are</h3>
                <p className="text-gray-700 leading-relaxed">
                  This app is an independent directory and resource platform that displays information about nonprofit organizations, community services, and public programs. It is not operated by a government body.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Privacy & Data Collection</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We do <strong>not collect any personal data</strong> such as names, email addresses, phone numbers, or government ID numbers. We also do not require user registration or login of any kind.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We may collect limited anonymous technical data (device type, app version, crash reports) strictly for debugging and performance improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ExternalLink className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">External Links & Third-Party Sites</h3>
                <p className="text-gray-700 leading-relaxed">
                  This app provides links to third-party websites including nonprofit organizations, government portals, and community resources. These external sites are not under our control, and we are not responsible for their content, privacy policies, or practices.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">
                <strong>Effective Date:</strong> July 18, 2025
              </p>
              <p className="text-sm text-blue-800 mb-2">
                For questions about this privacy policy or data handling practices, contact us at: <strong>canelzy@yahoo.com</strong>
              </p>
              <p className="text-sm text-blue-800">
                By clicking "Accept & Continue", you acknowledge that you have read and understood this disclaimer and privacy information, and agree to use this directory at your own risk.
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