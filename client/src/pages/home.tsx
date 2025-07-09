import { useState, useEffect } from "react";
import SearchBar from "@/components/search-bar";
import CategoryCard from "@/components/category-card";
import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon?: string;
}

const linksData: Record<string, LinkItem[]> = {
  "Taxes & Benefits": [
    { title: "CRA MyAccount", description: "Manage taxes online", url: "https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html", icon: "fas fa-user-circle" },
    { title: "Canada Child Benefit", description: "Child benefit info", url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html", icon: "fas fa-baby" },
    { title: "Tax Services", description: "General tax services", url: "https://www.canada.ca/en/services/taxes.html", icon: "fas fa-calculator" },
    { title: "Income Tax", description: "Personal income tax filing", url: "https://www.canada.ca/en/services/taxes/income-tax.html", icon: "fas fa-file-invoice-dollar" },
    { title: "GST/HST", description: "Goods and Services Tax", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html", icon: "fas fa-receipt" },
    { title: "Employment Insurance", description: "EI benefits and claims", url: "https://www.canada.ca/en/services/benefits/ei.html", icon: "fas fa-briefcase" },
    { title: "Family Benefits", description: "Support for families", url: "https://www.canada.ca/en/services/benefits/family.html", icon: "fas fa-home" },
    { title: "Benefits Finder", description: "Find benefits you may be eligible for", url: "https://www.canada.ca/en/services/benefits/finder.html", icon: "fas fa-search" }
  ],
  "Pensions & Retirement": [
    { title: "Canada Pension Plan (CPP) & OAS", description: "Public pensions", url: "https://www.canada.ca/en/services/benefits/publicpensions.html", icon: "fas fa-piggy-bank" },
    { title: "Canada Pension Plan", description: "CPP benefits and contributions", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp.html", icon: "fas fa-coins" },
    { title: "Old Age Security", description: "OAS pension benefits", url: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html", icon: "fas fa-user-clock" },
    { title: "Retirement Planning", description: "Plan for your retirement", url: "https://www.canada.ca/en/services/taxes/savings-and-pension-plans.html", icon: "fas fa-chart-line" }
  ],
  "Employment & Social Development": [
    { title: "Job Bank", description: "Find jobs across Canada", url: "https://www.jobbank.gc.ca/", icon: "fas fa-briefcase" },
    { title: "My Service Canada Account", description: "Access EI, CPP, and OAS online", url: "https://www.canada.ca/en/employment-social-development/services/my-account.html", icon: "fas fa-user-circle" },
    { title: "Employment Services", description: "Job search and career resources", url: "https://www.canada.ca/en/services/jobs.html", icon: "fas fa-handshake" },
    { title: "Skills Development", description: "Training and skills programs", url: "https://www.canada.ca/en/employment-social-development/services/training.html", icon: "fas fa-graduation-cap" },
    { title: "Workplace Safety", description: "Labour standards and safety", url: "https://www.canada.ca/en/employment-social-development/services/health-safety.html", icon: "fas fa-hard-hat" }
  ],
  "Immigration & Citizenship": [
    { title: "Immigration and Citizenship", description: "All immigration services", url: "https://www.canada.ca/en/services/immigration-citizenship.html", icon: "fas fa-passport" },
    { title: "Apply to Come to Canada", description: "Visa and immigration applications", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html", icon: "fas fa-plane-arrival" },
    { title: "Canadian Citizenship", description: "Become a Canadian citizen", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship.html", icon: "fas fa-flag" },
    { title: "Study in Canada", description: "Student visas and permits", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html", icon: "fas fa-university" },
    { title: "Work in Canada", description: "Work permits and opportunities", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html", icon: "fas fa-tools" }
  ],
  "Health & Disability": [
    { title: "Health Services", description: "Health information and services", url: "https://www.canada.ca/en/services/health.html", icon: "fas fa-heartbeat" },
    { title: "Disability Benefits", description: "Support for people with disabilities", url: "https://www.canada.ca/en/services/benefits/disability.html", icon: "fas fa-wheelchair" },
    { title: "Canadian Dental Care Plan", description: "Dental coverage program", url: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html", icon: "fas fa-tooth" },
    { title: "Mental Health", description: "Mental health resources", url: "https://www.canada.ca/en/public-health/services/mental-health-services.html", icon: "fas fa-brain" },
    { title: "Public Health", description: "Public health information", url: "https://www.canada.ca/en/public-health.html", icon: "fas fa-hospital" }
  ],
  "Legal / Identification": [
    { title: "Passport Services", description: "Apply for or renew passports", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html", icon: "fas fa-id-card" },
    { title: "Criminal Record Check", description: "Background checks and pardons", url: "https://www.canada.ca/en/parole-board-canada/services/record-suspensions.html", icon: "fas fa-shield-alt" },
    { title: "Court Services", description: "Federal court information", url: "https://www.fct-cf.gc.ca/", icon: "fas fa-gavel" },
    { title: "Legal Aid", description: "Legal assistance programs", url: "https://www.canada.ca/en/department-justice/services/legal-aid.html", icon: "fas fa-balance-scale" },
    { title: "Birth Certificate", description: "Vital statistics and certificates", url: "https://www.canada.ca/en/employment-social-development/services/sin.html", icon: "fas fa-certificate" }
  ],
  "Banking & Financial Services": [
    { title: "Bank of Canada", description: "Canada's central bank", url: "https://www.bankofcanada.ca/", icon: "fas fa-university" },
    { title: "Royal Bank of Canada (RBC)", description: "Canada's largest bank", url: "https://www.rbcroyalbank.com/", icon: "fas fa-building" },
    { title: "Toronto-Dominion Bank (TD)", description: "Personal and business banking", url: "https://www.td.com/ca/en/personal-banking", icon: "fas fa-credit-card" },
    { title: "Bank of Nova Scotia (Scotiabank)", description: "International banking services", url: "https://www.scotiabank.com/ca/en/personal.html", icon: "fas fa-globe" },
    { title: "Bank of Montreal (BMO)", description: "Personal and commercial banking", url: "https://www.bmo.com/main/personal", icon: "fas fa-chart-line" },
    { title: "Canadian Imperial Bank of Commerce (CIBC)", description: "Personal and business banking", url: "https://www.cibc.com/en/personal-banking.html", icon: "fas fa-handshake" },
    { title: "National Bank of Canada", description: "Quebec-based national bank", url: "https://www.nbc.ca/personal.html", icon: "fas fa-landmark" },
    { title: "Financial Consumer Agency of Canada (FCAC)", description: "Financial protection and education", url: "https://www.canada.ca/en/financial-consumer-agency.html", icon: "fas fa-shield-alt" },
    { title: "Canada Deposit Insurance Corporation (CDIC)", description: "Deposit insurance protection", url: "https://www.cdic.ca/", icon: "fas fa-lock" },
    { title: "Office of the Superintendent of Financial Institutions (OSFI)", description: "Financial institutions regulation", url: "https://www.osfi-bsif.gc.ca/", icon: "fas fa-balance-scale" }
  ],
  "General Government": [
    { title: "Canada.ca", description: "Official Government of Canada website", url: "https://www.canada.ca/", icon: "fas fa-maple-leaf" },
    { title: "Contact Government", description: "Get in touch with government departments", url: "https://www.canada.ca/en/contact.html", icon: "fas fa-phone" },
    { title: "Access to Information", description: "Request government information", url: "https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy.html", icon: "fas fa-file-alt" },
    { title: "Elections Canada", description: "Voting and elections information", url: "https://www.elections.ca/", icon: "fas fa-vote-yea" },
    { title: "Travel and Tourism", description: "Travel advisories and tourism", url: "https://travel.gc.ca/", icon: "fas fa-suitcase" },
    { title: "Weather", description: "Weather forecasts and warnings", url: "https://weather.gc.ca/", icon: "fas fa-cloud-sun" }
  ]
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('canadaAccessHub_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('canadaAccessHub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleToggleFavorite = (url: string) => {
    setFavorites(prev => 
      prev.includes(url) 
        ? prev.filter(fav => fav !== url)
        : [...prev, url]
    );
  };

  const getFavoriteLinks = () => {
    const favoriteLinks: LinkItem[] = [];
    Object.values(linksData).forEach(categoryLinks => {
      categoryLinks.forEach(link => {
        if (favorites.includes(link.url)) {
          favoriteLinks.push(link);
        }
      });
    });
    return favoriteLinks;
  };

  const categoryGradients = {
    "Taxes & Benefits": { from: "from-green-600", to: "to-green-700", icon: "fas fa-calculator" },
    "Pensions & Retirement": { from: "from-purple-600", to: "to-purple-700", icon: "fas fa-piggy-bank" },
    "Employment & Social Development": { from: "from-blue-600", to: "to-blue-700", icon: "fas fa-briefcase" },
    "Immigration & Citizenship": { from: "from-indigo-600", to: "to-indigo-700", icon: "fas fa-passport" },
    "Health & Disability": { from: "from-red-600", to: "to-red-700", icon: "fas fa-heartbeat" },
    "Legal / Identification": { from: "from-yellow-600", to: "to-yellow-700", icon: "fas fa-gavel" },
    "Banking & Financial Services": { from: "from-emerald-600", to: "to-emerald-700", icon: "fas fa-university" },
    "General Government": { from: "from-gray-600", to: "to-gray-700", icon: "fas fa-landmark" }
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
                <h1 className="text-3xl font-bold">Canada Access Hub</h1>
                <p className="text-blue-100 mt-1">All your government links in one place.</p>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="favorites">
              <i className="fas fa-star mr-2"></i>
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(linksData).map(([category, links]) => {
                const gradient = categoryGradients[category as keyof typeof categoryGradients] || { 
                  from: "from-gray-600", 
                  to: "to-gray-700", 
                  icon: "fas fa-cog" 
                };
                return (
                  <CategoryCard
                    key={category}
                    title={category}
                    description={`${links.length} services available`}
                    icon={gradient.icon}
                    links={links}
                    gradientFrom={gradient.from}
                    gradientTo={gradient.to}
                    searchTerm={searchTerm}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            {favorites.length === 0 ? (
              <Card className="bg-white shadow-md">
                <CardContent className="p-8 text-center">
                  <i className="fas fa-star text-gray-300 text-4xl mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
                  <p className="text-gray-600">Click the star icon next to any service to add it to your favorites.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-3"></i>
                    Your Favorite Services
                  </h3>
                  <div className="space-y-4">
                    {getFavoriteLinks().map((link, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {link.icon && <i className={`${link.icon} text-blue-600 text-lg`}></i>}
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="link-item font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {link.title}
                              <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                            </a>
                          </div>
                          <p className="text-gray-600 text-sm ml-6">{link.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFavorite(link.url)}
                          className="ml-4 text-yellow-500 hover:text-yellow-600"
                        >
                          <i className="fas fa-star"></i>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(linksData).map(([category, links]) => {
                const gradient = categoryGradients[category as keyof typeof categoryGradients] || { 
                  from: "from-gray-600", 
                  to: "to-gray-700", 
                  icon: "fas fa-cog" 
                };
                return (
                  <Card key={category} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <i className={`${gradient.icon} text-blue-600 text-2xl`}></i>
                        <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{links.length} services available</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("all")}
                        className="w-full"
                      >
                        View Services
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">About Canada Access Hub</h4>
              <p className="text-gray-300 text-sm">Your one-stop directory for accessing official Government of Canada services and resources.</p>
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