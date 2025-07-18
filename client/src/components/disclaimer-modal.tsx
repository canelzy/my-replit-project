import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, FileText, ExternalLink } from "lucide-react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const handleAccept = () => {
    // Only increment visit count if not already incremented this session
    const countIncrementedThisSession = sessionStorage.getItem('countIncrementedThisSession');
    
    if (!countIncrementedThisSession) {
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
      localStorage.setItem('visitCount', String(visitCount + 1));
      sessionStorage.setItem('countIncrementedThisSession', 'true');
    }
    
    onAccept();
  };

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
          
          <CardContent className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base mb-1 text-red-800">Important Disclaimer</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    This app is <strong>not affiliated with or endorsed by any government agency</strong>. It provides publicly available information for informational purposes only.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">1. Who We Are</h4>
                <p className="text-gray-700 leading-relaxed">
                  This app is an independent directory and resource platform that displays information about nonprofit organizations, community services, and public programs. It is not operated by a government body.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2. Information We Collect</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  We do <strong>not collect any personal data</strong>, such as:
                </p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Names</li>
                  <li>Email addresses</li>
                  <li>Phone numbers</li>
                  <li>Government ID numbers</li>
                  <li>Home or work addresses</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                  We also do not require user registration or login of any kind.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">3. Automatically Collected Data (Non-Personal)</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  To improve the app's performance and ensure functionality, we may collect limited technical data such as:
                </p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Device type and OS version</li>
                  <li>App version and usage patterns</li>
                  <li>Anonymous crash reports</li>
                </ul>
                <p className="text-orange-700 font-medium text-xs mt-2 bg-orange-50 p-2 rounded">
                  ⚠️ This data is non-identifiable and anonymous. It is used strictly for debugging, improving performance, and analytics.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">4. No Email Collection or Contact Access</h4>
                <p className="text-gray-700 leading-relaxed mb-2">We explicitly confirm that:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>The app does not request, collect, or store your email address</li>
                  <li>We do not access your contact list or allow any user-to-user messaging</li>
                  <li>There are no email subscription features in the app</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">5. How We Use the Information We Collect</h4>
                <p className="text-gray-700 leading-relaxed mb-2">Any non-personal data collected is used only to:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Analyze app performance</li>
                  <li>Detect and fix crashes</li>
                  <li>Improve content delivery</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                  We do <strong>not share, sell, or rent any data</strong> to third parties for marketing or profiling purposes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">6. Third-Party Services</h4>
                <p className="text-gray-700 leading-relaxed mb-2">This app may use external services for analytics or performance monitoring. These services may collect non-personal data under their own privacy policies:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Google Play Services</li>
                  <li>Firebase Crashlytics</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                  We do not control how these services collect or use data, but we aim to minimize their data footprint.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">7. Links to External Content</h4>
                <p className="text-gray-700 leading-relaxed mb-2">This app provides links to third-party websites, including:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Nonprofit organization websites</li>
                  <li>Government portals and open data sources</li>
                  <li>Cultural, community, and settlement resources</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">
                  These external sites are not under our control. When you click a link, you are subject to that site's privacy policy and terms. We are not responsible for how those sites collect, store, or use your data.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">8. Data Retention</h4>
                <p className="text-gray-700 leading-relaxed">
                  We do not store or retain any personal information. Any anonymous crash or analytics data is retained only for the minimum period necessary to diagnose issues and improve functionality.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">9. Children's Privacy</h4>
                <p className="text-gray-700 leading-relaxed">
                  This app is intended for general audiences and does not knowingly collect information from children under 13. If you believe that personal data was provided inadvertently, please contact us and we will delete it immediately.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">10. Data Security</h4>
                <p className="text-gray-700 leading-relaxed mb-2">We implement reasonable technical measures to protect the app against unauthorized access and vulnerabilities. These include:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li>Secure app builds</li>
                  <li>No data storage on-device or remotely</li>
                  <li>HTTPS encryption for any external data sources</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">11. Policy Updates</h4>
                <p className="text-gray-700 leading-relaxed">
                  We may update this policy from time to time. Changes will be posted within the app and reflected by an updated "Last Updated" date at the top of this page.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">12. Contact Us</h4>
                <p className="text-gray-700 leading-relaxed mb-2">If you have any questions or concerns about this Privacy Policy or the app's data handling practices, please contact us at:</p>
                <ul className="text-gray-700 list-disc list-inside ml-4 space-y-1">
                  <li><strong>Email:</strong> Apps@Giolynx.org</li>
                  <li><strong>Developer:</strong> GIOLYNXAPPS</li>
                  <li><strong>Location:</strong> Canada</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <p className="text-xs text-blue-800 font-medium mb-2">
                <strong>Effective Date:</strong> July 18, 2025 | <strong>Last Updated:</strong> July 18, 2025
              </p>
              <p className="text-xs text-blue-800">
                By clicking "Accept & Continue", you acknowledge that you have read and understood this complete privacy policy and agree to use this directory at your own risk.
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