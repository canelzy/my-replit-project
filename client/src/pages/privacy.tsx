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
                Welcome to Information Access Hub, a Progressive Web App developed by GiolynxApps ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our app. We are committed to safeguarding your privacy and complying with applicable laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA) in Canada, the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Disclaimer</h2>
              <p className="text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                Information Access Hub is not affiliated with, endorsed by, or representing any government entity, including the Government of Canada. It is a convenience tool designed to provide information sourced from official government websites (e.g., canada.ca). Use of this app is at your own discretion, and we are not responsible for any inaccuracies or consequences arising from its use. For official government services, please visit authorized sites such as canada.ca.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Information We Collect</h2>
              <p className="text-gray-700">
                We do not intentionally collect personal data such as names, addresses, email addresses, or phone numbers. The app may collect the following non-personal information to enhance functionality and user experience:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Device Information</strong>: Device type, operating system, browser type, and IP address (anonymized where possible).</li>
                <li><strong>Usage Data</strong>: Pages visited, session duration, and interaction data (e.g., button clicks), collected anonymously.</li>
                <li><strong>Local Storage Data</strong>: Cached data for offline access via service workers, stored locally on your device.</li>
              </ul>
              <p className="text-gray-700">
                Additionally, no login credentials, personally identifiable information (PII), or location tracking occurs. We do not collect data from users under 13, ensuring child safety. Contact form data, if submitted, is used solely to respond to inquiries and is not stored or shared beyond that purpose.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">How We Use Your Information</h2>
              <p className="text-gray-700">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li>Provide, maintain, and improve the app's functionality and user experience.</li>
                <li>Analyze usage patterns and optimize performance (e.g., fixing bugs, enhancing features).</li>
                <li>Ensure compliance with legal obligations and protect against fraud or security threats.</li>
              </ul>
              <p className="text-gray-700">
                We do not use your information for advertising or marketing purposes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Sharing and Disclosure of Information</h2>
              <p className="text-gray-700">
                We do not sell, trade, rent, or transfer your personal information to third parties. We may share non-personal, aggregated data with:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Service Providers</strong>: Third-party analytics tools (currently none in use) to process usage data, contractually bound to maintain confidentiality and use data only for our purposes.</li>
                <li><strong>Legal Requirements</strong>: We may disclose information if required by law, regulation, or to protect our rights, property, or safety, or that of others.</li>
              </ul>
              <p className="text-gray-700">
                We do not engage in cross-app tracking or share data with ad networks.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Data Security</h2>
              <p className="text-gray-700">
                All connections use HTTPS encryption to secure data transmission. We implement industry-standard security measures, including secure storage for any collected data and strict access controls to prevent unauthorized access. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security. In case of a data breach, we will notify affected users and authorities as required by law.
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
                <li>Canada Revenue Agency: <a href="https://canada.ca/en/revenue-agency" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/revenue-agency</a></li>
                <li>Employment and Social Development Canada: <a href="https://canada.ca/en/employment-social-development" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/employment-social-development</a></li>
                <li>Immigration, Refugees and Citizenship Canada: <a href="https://canada.ca/en/immigration-refugees-citizenship" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/immigration-refugees-citizenship</a></li>
                <li>Department of Justice: <a href="https://canada.ca/en/department-justice" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/department-justice</a></li>
                <li>Public Health Agency of Canada: <a href="https://canada.ca/en/public-health" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/public-health</a></li>
                <li>Elections Canada: <a href="https://elections.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">elections.ca</a></li>
                <li>Global Affairs Canada: <a href="https://canada.ca/en/global-affairs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/global-affairs</a></li>
                <li>Public Safety Canada: <a href="https://canada.ca/en/public-safety" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/public-safety</a></li>
                <li>National Defence: <a href="https://canada.ca/en/department-national-defence" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/department-national-defence</a></li>
                <li>Correctional Service of Canada: <a href="https://canada.ca/en/correctional-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/correctional-service</a></li>
                <li>Transport Canada: <a href="https://canada.ca/en/transport" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca/en/transport</a></li>
                <li>General Government: <a href="https://canada.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">canada.ca</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">External Links</h2>
              <p className="text-gray-700">
                Links to external government sites are provided for convenience. These sites have their own privacy policies, and we encourage users to review them. All external connections are secured with HTTPS encryption.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">User Rights and Choices</h2>
              <p className="text-gray-700">
                You have the following rights regarding your information:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Access</strong>: Request details of any data we hold about you (if any).</li>
                <li><strong>Correction</strong>: Request correction of inaccurate data.</li>
                <li><strong>Deletion</strong>: Request deletion of data, subject to legal retention periods.</li>
                <li><strong>Opt-Out</strong>: Disable analytics collection if supported by the app (e.g., via settings, if implemented).</li>
              </ul>
              <p className="text-gray-700">
                For any privacy-related questions or to exercise these rights, contact us at <a href="mailto:Apps@Giolynx.org" className="text-blue-600 hover:text-blue-800">Apps@Giolynx.org</a>. We will respond promptly to address your concerns. For EEA users, you may also contact our Data Protection Officer at the same email or lodge a complaint with your local data protection authority.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">International Data Transfers</h2>
              <p className="text-gray-700">
                If you are located outside Canada or the EEA, your data may be processed in Canada or the United States by our service providers. We ensure compliance with applicable data protection laws, including GDPR for EEA users, through standard contractual clauses where necessary.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Children's Privacy</h2>
              <p className="text-gray-700">
                <strong>Information Access Hub</strong> is not directed to children under 13. We do not knowingly collect data from children. If we become aware of such collection, we will delete the data and terminate the account (if applicable). Parents or guardians should contact us to report any concerns.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Policy Availability</h2>
              <p className="text-gray-700">
                This privacy policy is accessible via a valid, active URL within the app and on the Google Play Store listing page. It is non-editable and complies with Google Play requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this policy to reflect changes in our practices or legal requirements. The "Last Updated" date will be revised, and we will notify you of significant changes via the app or email (if contact information is provided). Continued use of the app after updates constitutes acceptance of the new policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Compliance with Laws</h2>
              <p className="text-gray-700">
                We comply with PIPEDA in Canada, GDPR for EEA users, CCPA for California residents, and Google Play Developer Program Policies, ensuring transparency, consent (where required), and data minimization.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Contact Us</h2>
              <p className="text-gray-700">
                For questions, concerns, or to exercise your rights, please contact us at <a href="mailto:Apps@Giolynx.org" className="text-blue-600 hover:text-blue-800">Apps@Giolynx.org</a>. You may also write to us at GiolynxApps, Toronto, ON, Canada.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              &copy; 2025 Information Access Hub | GiolynxApps
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}