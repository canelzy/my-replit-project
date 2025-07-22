import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="header-gradient text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="text-white hover:text-gray-200 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <i className="fas fa-shield-alt text-red-400 text-2xl"></i>
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Privacy Policy</CardTitle>
            <p className="text-gray-600">
              <strong>Last Updated:</strong> July 22, 2025
            </p>
            <p className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <strong>Disclaimer:</strong> Canada Access Hub is not affiliated with, endorsed by, or authorized by any Canadian government entity. All information is sourced from publicly available resources, such as{" "}
              <a href="https://www.canada.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">Canada.ca</a>,{" "}
              <a href="https://www.cra-arc.gc.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">Canada Revenue Agency</a>, and{" "}
              <a href="https://www.cic.gc.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">Immigration, Refugees and Citizens Canada</a>.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">1. Who We Are</h2>
              <p className="text-gray-700">
                Canada Access Hub is an independent directory and resource platform that provides information about nonprofit organizations, community services, and public programs in Canada. It is developed and operated by GIOLYNXAPPS, a private entity, and is not affiliated with any government body.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">2. Information We Collect</h2>
              <p className="text-gray-700">
                We do not collect personal data, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Phone numbers</li>
                <li>Government identification numbers</li>
                <li>Home or work addresses</li>
              </ul>
              <p className="text-gray-700">No user registration or login is required to use the app.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">3. Automatically Collected Data (Non-Personal)</h2>
              <p className="text-gray-700">
                To improve app performance and functionality, we may collect limited, non-identifiable technical data, such as:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Device type and operating system version</li>
                <li>App version and usage patterns</li>
                <li>Anonymous crash reports</li>
              </ul>
              <p className="text-gray-700">
                This data is used solely for debugging, performance optimization, and analytics and cannot be linked to an individual user.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">4. No Email Collection or Contact Access</h2>
              <p className="text-gray-700">We confirm that:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>The app does not request, collect, or store email addresses.</li>
                <li>We do not access your contact list or enable user-to-user messaging.</li>
                <li>There are no email subscription features in the app.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">5. How We Use the Information We Collect</h2>
              <p className="text-gray-700">Non-personal data is used only to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Analyze and improve app performance</li>
                <li>Detect and resolve crashes</li>
                <li>Enhance content delivery</li>
              </ul>
              <p className="text-gray-700">
                We do not share, sell, or rent any data to third parties for marketing or profiling purposes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">6. Third-Party Services</h2>
              <p className="text-gray-700">
                The app may use the following third-party services for analytics and performance monitoring:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Google Play Services:</strong> For app distribution and analytics.</li>
                <li><strong>Firebase Crashlytics:</strong> For crash reporting and diagnostics.</li>
              </ul>
              <p className="text-gray-700">
                These services may collect non-personal data under their own privacy policies, which we do not control. We minimize their data collection to the extent possible.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">7. Links to External Content</h2>
              <p className="text-gray-700">The app provides links to third-party websites, including:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Nonprofit organization websites</li>
                <li>Government portals and open data sources (e.g., <a href="https://www.canada.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">Canada.ca</a>)</li>
                <li>Cultural, community, and settlement resources</li>
              </ul>
              <p className="text-gray-700">
                These external sites are not under our control. When you access them, you are subject to their privacy policies and terms. We are not responsible for their data practices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">8. Data Retention</h2>
              <p className="text-gray-700">
                We do not store or retain personal information. Anonymous crash and analytics data is retained only for the minimum period necessary to diagnose issues and improve functionality, typically no longer than 30 days.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">9. Children's Privacy</h2>
              <p className="text-gray-700">
                The app is intended for general audiences and does not knowingly collect information from children under 13. If we become aware of such data, we will delete it immediately. Contact us if you believe such data was provided inadvertently.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">10. Data Security</h2>
              <p className="text-gray-700">We implement reasonable technical measures to protect the app, including:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Secure app builds</li>
                <li>No on-device or remote storage of personal data</li>
                <li>HTTPS encryption for external data sources</li>
              </ul>
              <p className="text-gray-700">
                While we strive to maintain security, no system is completely secure, and we cannot guarantee absolute protection.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">11. Policy Updates</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. Changes will be posted within the app and on our website at{" "}
                <a href="https://canadian-service-hub-canelzy.replit.app/privacy-policy.html" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">
                  https://canadian-service-hub-canelzy.replit.app/privacy-policy.html
                </a>, with an updated "Last Updated" date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">12. Contact Us</h2>
              <p className="text-gray-700">For questions or concerns about this Privacy Policy or our data practices, contact us at:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Email:</strong> <a href="mailto:Apps@Giolynx.org" className="text-blue-600 hover:text-blue-800">Apps@Giolynx.org</a></li>
                <li><strong>Developer:</strong> GIOLYNXAPPS</li>
                <li><strong>Location:</strong> Canada</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Effective Date:</strong> July 22, 2025
              </p>
              <p className="text-gray-700">
                By using Canada Access Hub, you acknowledge that you have read and understood this Privacy Policy and agree to use the app at your own risk.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              &copy; 2025 Canada Access Hub | GIOLYNXAPPS
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}