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
              <strong>Effective Date:</strong> July 16, 2025
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>Canada Access Hub</strong> is committed to protecting your privacy. This privacy policy explains how we handle information when you use our app or website.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">1. Information We Do Not Collect</h2>
              <p className="text-gray-700">
                We do <strong>not</strong> collect, store, or share any personal information from users.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>No account or login is required.</li>
                <li>No location tracking.</li>
                <li>No cookies, analytics, or ad trackers are used.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">2. Third-Party Services</h2>
              <p className="text-gray-700">
                We link to external government and community websites. These sites have their own privacy policies and we are not responsible for their practices.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">3. Security</h2>
              <p className="text-gray-700">
                We ensure all links are secure via HTTPS and do not request any device permissions or store personal information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">4. Children's Privacy</h2>
              <p className="text-gray-700">
                Our app is safe for all ages and does not knowingly collect data from children under 13.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">5. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this policy as the app evolves. Changes will be posted here with a revised date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">6. Contact</h2>
              <p className="text-gray-700">Questions? Contact us at:</p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Email: <a href="mailto:support@giolynx.org" className="text-blue-600 hover:text-blue-800">support@giolynx.org</a>
                </p>
                <p className="text-gray-700">
                  Website: <a href="https://canada-services-hub-canelzy.replit.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada-services-hub-canelzy.replit.app</a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              &copy; 2025 Canada Access Hub | Giolynx Digital
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}