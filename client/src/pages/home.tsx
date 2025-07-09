import { useState } from "react";
import SearchBar from "@/components/search-bar";
import CategoryCard from "@/components/category-card";
import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";

const taxesLinks = [
  { title: "Canada Revenue Agency", url: "https://www.canada.ca/en/revenue-agency.html" },
  { title: "Tax Services", url: "https://www.canada.ca/en/services/taxes.html" },
  { title: "Income Tax", url: "https://www.canada.ca/en/services/taxes/income-tax.html" },
  { title: "Tax Credits and Benefits", url: "https://www.canada.ca/en/services/taxes/child-and-family-benefits.html" },
  { title: "GST/HST", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html" },
  { title: "Payroll", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll.html" },
  { title: "Charities and Giving", url: "https://www.canada.ca/en/services/taxes/charities.html" },
  { title: "Savings and Pension Plans", url: "https://www.canada.ca/en/services/taxes/savings-and-pension-plans.html" },
  { title: "My Account (CRA)", url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services.html" }
];

const benefitsLinks = [
  { title: "Benefits Overview", url: "https://www.canada.ca/en/services/benefits.html" },
  { title: "Employment Insurance", url: "https://www.canada.ca/en/services/benefits/ei.html" },
  { title: "Family Benefits", url: "https://www.canada.ca/en/services/benefits/family.html" },
  { title: "Disability Benefits", url: "https://www.canada.ca/en/services/benefits/disability.html" },
  { title: "Canadian Dental Care Plan", url: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html" },
  { title: "Benefits Finder", url: "https://www.canada.ca/en/services/benefits/finder.html" },
  { title: "My Service Canada Account", url: "https://www.canada.ca/en/employment-social-development/services/my-account.html" }
];

const pensionsLinks = [
  { title: "Public Pensions", url: "https://www.canada.ca/en/services/benefits/publicpensions.html" },
  { title: "Canada Pension Plan", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp.html" },
  { title: "Old Age Security", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html" }
];

const otherServicesLinks = [
  { title: "Health", url: "https://www.canada.ca/en/services/health.html" },
  { title: "Immigration and Citizenship", url: "https://www.canada.ca/en/services/immigration-citizenship.html" },
  { title: "Jobs", url: "https://www.canada.ca/en/services/jobs.html" },
  { title: "Travel and Tourism", url: "https://travel.gc.ca/" },
  { title: "Business and Industry", url: "https://www.canada.ca/en/services/business.html" },
  { title: "Environment and Natural Resources", url: "https://www.canada.ca/en/services/environment.html" },
  { title: "National Security and Defence", url: "https://www.canada.ca/en/services/defence.html" },
  { title: "Culture, History and Sport", url: "https://www.canada.ca/en/services/culture.html" },
  { title: "Policing, Justice and Emergencies", url: "https://www.canada.ca/en/services/policing.html" },
  { title: "Transport and Infrastructure", url: "https://www.canada.ca/en/services/transport.html" },
  { title: "Canada and the World", url: "https://www.canada.ca/en/services/world.html" },
  { title: "Money and Finances", url: "https://www.canada.ca/en/services/finance.html" },
  { title: "Science and Innovation", url: "https://www.canada.ca/en/services/science.html" },
  { title: "Indigenous Peoples", url: "https://www.canada.ca/en/services/indigenous-peoples.html" },
  { title: "Veterans and Military", url: "https://www.canada.ca/en/services/veterans-military.html" },
  { title: "Youth", url: "https://www.canada.ca/en/services/youth.html" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-maple-leaf text-red-600 text-2xl"></i>
              <div>
                <h1 className="text-3xl font-bold">Canadian Government Services</h1>
                <p className="text-blue-100 mt-1">Access key government services for taxes, benefits, pensions, and more.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm">🇨🇦</span>
              <span className="text-sm font-medium">Official Government Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <SearchBar onSearch={handleSearch} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryCard
            title="Taxes"
            description="Tax services, filing, credits, and CRA resources"
            icon="fas fa-calculator"
            links={taxesLinks}
            gradientFrom="from-green-600"
            gradientTo="to-green-700"
            searchTerm={searchTerm}
          />
          
          <CategoryCard
            title="Benefits"
            description="Employment insurance, family benefits, and support programs"
            icon="fas fa-heart"
            links={benefitsLinks}
            gradientFrom="from-blue-600"
            gradientTo="to-blue-700"
            searchTerm={searchTerm}
          />
          
          <CategoryCard
            title="Pensions"
            description="Canada Pension Plan, Old Age Security, and retirement planning"
            icon="fas fa-piggy-bank"
            links={pensionsLinks}
            gradientFrom="from-purple-600"
            gradientTo="to-purple-700"
            searchTerm={searchTerm}
          />
          
          <CategoryCard
            title="Other Services"
            description="Health, immigration, jobs, travel, and additional government services"
            icon="fas fa-cogs"
            links={otherServicesLinks}
            gradientFrom="from-indigo-600"
            gradientTo="to-indigo-700"
            searchTerm={searchTerm}
          />
        </div>

        {/* Quick Access Section */}
        <Card className="mt-12 bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-bolt text-yellow-500 mr-2"></i>
              Quick Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Provincial Services</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="https://www.ontario.ca/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">Ontario</a></li>
                  <li><a href="https://www2.gov.bc.ca/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">British Columbia</a></li>
                  <li><a href="https://www.quebec.ca/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">Quebec</a></li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Emergency Services</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="https://www.canada.ca/en/services/policing.html" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">Emergency Preparedness</a></li>
                  <li><a href="https://www.canada.ca/en/public-health.html" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">Public Health</a></li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Support & Help</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="https://www.canada.ca/en/contact.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Contact Government</a></li>
                  <li><a href="https://www.canada.ca/en/services.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">All Services</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-8">
          <ContactForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">About This Directory</h4>
              <p className="text-gray-300 text-sm">This directory provides quick access to official Government of Canada services and resources.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Official Links</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li><a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Canada.ca</a></li>
                <li><a href="https://www.canada.ca/en/services.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">All Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-300 text-sm">For official government inquiries, visit the <a href="https://www.canada.ca/en/contact.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Government page</a>.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Links are sourced from the Government of Canada. Last updated: July 9, 2025.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
