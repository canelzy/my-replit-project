import { useState, useEffect } from "react";
import SearchBar from "@/components/search-bar";
import CategoryCard from "@/components/category-card";
import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon?: string;
}

// Key Official Directories & Databases
const officialDirectories = [
  {
    name: "Canada Revenue Agency (CRA) Charity Listings",
    url: "https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en",
    description: "Official public database of registered charities in Canada."
  },
  {
    name: "Ontario Not-for-Profit Corporations (ONCA) Registry",
    url: "https://www.ontario.ca/page/ontario-not-profit-corporations-act",
    description: "Registry and information for Ontario non-profit corporations."
  },
  {
    name: "CharityVillage Directory",
    url: "https://charityvillage.com/",
    description: "Canada's largest directory of charities and non-profits."
  },
  {
    name: "Imagine Canada Directory",
    url: "https://www.imaginecanada.ca/",
    description: "National umbrella organization for Canada's charitable sector."
  }
];

// Ontario Non-Profit Organizations by Category
const ontarioNonProfits = {
  "Health & Disability Support": [
    {
      name: "March of Dimes Canada (Ontario)",
      url: "https://www.marchofdimes.ca/",
      description: "Support for people with disabilities and rehabilitation services."
    },
    {
      name: "Canadian Mental Health Association - Ontario",
      url: "https://ontario.cmha.ca/",
      description: "Mental health services and advocacy across Ontario."
    },
    {
      name: "Ontario Federation for Cerebral Palsy",
      url: "https://www.ofcp.ca/",
      description: "Support and advocacy for people with cerebral palsy."
    },
    {
      name: "Canadian Cancer Society - Ontario",
      url: "https://cancer.ca/en/about-us/locations/ontario",
      description: "Cancer support, research, and advocacy services."
    }
  ],
  "Immigration & Settlement Services": [
    {
      name: "COSTI Immigrant Services",
      url: "https://www.costi.org/",
      description: "Settlement services for newcomers to Canada in the GTA."
    },
    {
      name: "Ottawa Community Immigrant Services Organization (OCISO)",
      url: "https://ociso.org/",
      description: "Settlement and integration services for immigrants in Ottawa."
    },
    {
      name: "Hamilton Centre for Civic Inclusion",
      url: "https://www.hcci.ca/",
      description: "Immigration services and community integration in Hamilton."
    },
    {
      name: "London Cross Cultural Learner Centre",
      url: "https://www.lcclc.org/",
      description: "Settlement services for newcomers in London, Ontario."
    }
  ],
  "Housing & Homelessness Assistance": [
    {
      name: "Street Health Centre",
      url: "https://www.streethealth.ca/",
      description: "Healthcare and support services for homeless individuals in Toronto."
    },
    {
      name: "Habitat for Humanity Ontario",
      url: "https://habitatontario.ca/",
      description: "Affordable housing solutions and home ownership programs."
    },
    {
      name: "The Lighthouse",
      url: "https://www.lighthousemuskoka.com/",
      description: "Emergency shelter and housing support in Muskoka region."
    },
    {
      name: "Ottawa Inner City Health",
      url: "https://www.ottawainnercityhealth.ca/",
      description: "Healthcare services for vulnerable populations in Ottawa."
    }
  ],
  "Financial & Legal Aid": [
    {
      name: "Legal Aid Ontario",
      url: "https://www.legalaid.on.ca/",
      description: "Legal services for low-income Ontarians."
    },
    {
      name: "Community Legal Education Ontario (CLEO)",
      url: "https://www.cleo.on.ca/",
      description: "Legal information and education resources."
    },
    {
      name: "Ontario Human Rights Legal Support Centre",
      url: "https://www.hrlsc.on.ca/",
      description: "Legal support for human rights issues."
    },
    {
      name: "Prosper Canada",
      url: "https://prospercanada.org/",
      description: "Financial empowerment and poverty reduction programs."
    }
  ],
  "Employment & Training": [
    {
      name: "Ontario Works",
      url: "https://www.ontario.ca/page/ontario-works",
      description: "Employment assistance and income support."
    },
    {
      name: "ACCES Employment",
      url: "https://accesemployment.ca/",
      description: "Employment services for skilled immigrants and refugees."
    },
    {
      name: "WoodGreen Community Services",
      url: "https://www.woodgreen.org/",
      description: "Employment, training, and community support services."
    },
    {
      name: "Skills for Change",
      url: "https://skillsforchange.org/",
      description: "Employment services for newcomers and racialized communities."
    }
  ],
  "Family & Child Support": [
    {
      name: "Children's Aid Society of Ontario",
      url: "https://www.oacas.org/",
      description: "Child protection and family support services."
    },
    {
      name: "Ontario Association of Family Resource Programs",
      url: "https://www.oafrp.ca/",
      description: "Family support and early childhood development programs."
    },
    {
      name: "Big Brothers Big Sisters of Ontario",
      url: "https://www.bigbrothersbigsisters.ca/",
      description: "Youth mentorship and support programs."
    },
    {
      name: "Family Service Ontario",
      url: "https://familyserviceontario.org/",
      description: "Network of family service agencies across Ontario."
    }
  ],
  "Senior & Pension Support": [
    {
      name: "Ontario Association of Non-Profit Homes and Services for Seniors",
      url: "https://www.aohss.org/",
      description: "Advocacy and support for senior housing and services."
    },
    {
      name: "Seniors' Secretariat",
      url: "https://www.ontario.ca/page/seniors-secretariat",
      description: "Government support and resources for seniors."
    },
    {
      name: "Elder Abuse Ontario",
      url: "https://www.elderabuseontario.com/",
      description: "Prevention and support services for elder abuse."
    },
    {
      name: "Meals on Wheels Ontario",
      url: "https://www.mealsonwheelsontario.org/",
      description: "Meal delivery and support services for seniors."
    }
  ],
  "Education & Literacy": [
    {
      name: "Literacy and Basic Skills Program",
      url: "https://www.ontario.ca/page/literacy-and-basic-skills-program",
      description: "Adult literacy and basic skills training."
    },
    {
      name: "Ontario Library Association",
      url: "https://www.accessola.org/",
      description: "Public library services and literacy programs."
    },
    {
      name: "Learning Disabilities Association of Ontario",
      url: "https://www.ldao.ca/",
      description: "Support and advocacy for individuals with learning disabilities."
    },
    {
      name: "Frontier College",
      url: "https://www.frontiercollege.ca/",
      description: "Literacy and learning programs for marginalized communities."
    }
  ],
  "Environmental & Community Development": [
    {
      name: "Ontario Nature",
      url: "https://ontarionature.org/",
      description: "Conservation and environmental education programs."
    },
    {
      name: "Environmental Defence Canada",
      url: "https://environmentaldefence.ca/",
      description: "Environmental advocacy and protection initiatives."
    },
    {
      name: "Neighbourhood Organization",
      url: "https://www.theneighbourhoodorganization.org/",
      description: "Community development and social services in Toronto."
    },
    {
      name: "Ontario Healthy Communities Coalition",
      url: "https://www.ohcc-ccso.ca/",
      description: "Community health promotion and development."
    }
  ]
};

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
  "Non-Profits": [
    { title: "Canada Revenue Agency (CRA) Charity Listings", description: "Official database of registered charities in Canada", url: "https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en", icon: "fas fa-database" },
    { title: "CharityVillage Directory", description: "Canada's largest directory of charities and non-profits", url: "https://charityvillage.com/", icon: "fas fa-heart" },
    { title: "Imagine Canada", description: "National umbrella organization for Canada's charitable sector", url: "https://www.imaginecanada.ca/", icon: "fas fa-hands-helping" },
    { title: "Ontario Not-for-Profit Corporations (ONCA)", description: "Registry for Ontario non-profit corporations", url: "https://www.ontario.ca/page/ontario-not-profit-corporations-act", icon: "fas fa-building" },
    { title: "Canada Helps", description: "Online donation platform for Canadian charities", url: "https://www.canadahelps.org/", icon: "fas fa-donate" },
    { title: "Volunteer Canada", description: "National voice for volunteerism in Canada", url: "https://volunteer.ca/", icon: "fas fa-user-friends" },
    { title: "United Way Canada", description: "Community-based charity network", url: "https://www.unitedway.ca/", icon: "fas fa-community" },
    { title: "Canadian Red Cross", description: "Humanitarian organization providing emergency assistance", url: "https://www.redcross.ca/", icon: "fas fa-plus-circle" }
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
    "Non-Profits": { from: "from-pink-600", to: "to-pink-700", icon: "fas fa-heart" },
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="nonprofits">Non-Profits</TabsTrigger>
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

          <TabsContent value="nonprofits">
            <div className="space-y-8">
              {/* Category Filter */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                      Filter by Category:
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {Object.keys(ontarioNonProfits).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Official Directories Section */}
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-database text-blue-600 mr-3"></i>
                    Key Official Directories & Databases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {officialDirectories.map((directory, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-folder-open text-blue-600 text-lg mt-1"></i>
                          <div className="flex-1">
                            <a 
                              href={directory.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {directory.name}
                              <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                            </a>
                            <p className="text-gray-600 text-sm mt-1">{directory.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Non-Profit Organizations by Category */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(ontarioNonProfits)
                  .filter(([category]) => selectedCategory === "all" || category === selectedCategory)
                  .map(([category, organizations]) => (
                    <Card key={category} className="bg-white shadow-md">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <i className="fas fa-heart text-red-500 mr-3"></i>
                          {category}
                        </h4>
                        <div className="space-y-3">
                          {organizations
                            .filter(org => 
                              searchTerm === "" || 
                              org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              category.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((org, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-start space-x-3">
                                  <i className="fas fa-hands-helping text-green-600 text-sm mt-1"></i>
                                  <div className="flex-1">
                                    <a 
                                      href={org.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                      {org.name}
                                      <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                    </a>
                                    <p className="text-gray-600 text-sm mt-1">{org.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
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