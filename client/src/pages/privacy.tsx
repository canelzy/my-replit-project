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
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Introduction</h2>
              <p className="text-gray-700">
                Welcome to Canada Access Hub, a Progressive Web App developed by GiolynxApps. This privacy policy outlines how we handle your data to ensure compliance with Google Play Developer Program Policies, particularly the Misleading Claims and Personal and Sensitive User Data policies. We are committed to protecting your privacy and providing a transparent experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Disclaimer</h2>
              <p className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                Canada Access Hub is not affiliated with, endorsed by, or representing any government entity, including the Government of Canada. It is a convenience tool designed to provide information sourced from official government websites. For official government services, please visit authorized sites such as canada.ca. Use of this app is at your own discretion, and we are not responsible for any inaccuracies or consequences arising from its use.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Data Collection and Usage</h2>
              <p className="text-gray-700">
                This app does not collect, store, or share any personal data, including names, addresses, or phone numbers. We do not require login credentials or access to personally identifiable information (PII). No location tracking occurs, and no data is collected from users under 13, ensuring safety for children. Contact form data, if submitted, is used solely to respond to inquiries and is not stored or shared beyond that purpose.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Data Security</h2>
              <p className="text-gray-700">
                All connections use HTTPS encryption to secure data transmission. We do not sell, trade, or transfer any user data to outside parties. Data handling is limited to operational needs, with strict access controls in place to prevent unauthorized access.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Analytics and Tracking</h2>
              <p className="text-gray-700">
                We do not use third-party analytics tools, cookies, or tracking technologies. Your browsing behavior is not monitored, ensuring a no-tracking experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Sources of Information</h2>
              <p className="text-gray-700">
                Government-related information in this app is sourced from the following official Canadian government websites:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>Canada Revenue Agency: <a href="https://canada.ca/en/revenue-agency" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/revenue-agency</a></li>
                <li>Employment and Social Development Canada: <a href="https://canada.ca/en/employment-social-development" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/employment-social-development</a></li>
                <li>Immigration, Refugees and Citizenship Canada: <a href="https://canada.ca/en/immigration-refugees-citizenship" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/immigration-refugees-citizenship</a></li>
                <li>Department of Justice: <a href="https://canada.ca/en/department-justice" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/department-justice</a></li>
                <li>Public Health Agency of Canada: <a href="https://canada.ca/en/public-health" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/public-health</a></li>
                <li>Elections Canada: <a href="https://elections.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">elections.ca</a></li>
                <li>Global Affairs Canada: <a href="https://canada.ca/en/global-affairs" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/global-affairs</a></li>
                <li>Public Safety Canada: <a href="https://canada.ca/en/public-safety" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/public-safety</a></li>
                <li>National Defence: <a href="https://canada.ca/en/department-national-defence" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/department-national-defence</a></li>
                <li>Correctional Service of Canada: <a href="https://canada.ca/en/correctional-service" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/correctional-service</a></li>
                <li>Transport Canada: <a href="https://canada.ca/en/transport" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca/en/transport</a></li>
                <li>General Government: <a href="https://canada.ca" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">canada.ca</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">External Links</h2>
              <p className="text-gray-700">
                Links to external government sites are provided for convenience. These sites have their own privacy policies, and we encourage users to review them. All external connections are secured with HTTPS encryption.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Policy Availability</h2>
              <p className="text-gray-700">
                This privacy policy is accessible via a valid, active URL within the app and on the Google Play Store listing page. It is non-editable and complies with Google Play requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">User Rights and Contact</h2>
              <p className="text-gray-700">
                For any privacy-related questions, contact us at <a href="mailto:Apps@Giolynx.org" className="text-blue-600 hover:text-blue-800">Apps@Giolynx.org</a>. We will respond promptly to address your concerns.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              &copy; 2025 Canada Access Hub | GiolynxApps
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}