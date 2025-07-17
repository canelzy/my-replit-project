import { useState, useEffect } from "react";
import SearchBar from "@/components/search-bar";
import CategoryCard from "@/components/category-card";
import ContactForm from "@/components/contact-form";
import ShareButton from "@/components/share-button";
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
  ],
  "Non-Profits in Toronto": [
    {
      name: "United Way Greater Toronto",
      url: "https://www.unitedwaygt.org/",
      description: "Leading funder of social services in the Greater Toronto Area."
    },
    {
      name: "Daily Bread Food Bank",
      url: "https://www.dailybread.ca/",
      description: "Toronto's largest food bank providing emergency food assistance."
    },
    {
      name: "Centre for Addiction and Mental Health (CAMH)",
      url: "https://www.camh.ca/",
      description: "Canada's largest mental health and addiction hospital."
    },
    {
      name: "Toronto Public Library Foundation",
      url: "https://www.torontopubliclibrary.ca/",
      description: "Supporting library services and programs across Toronto."
    },
    {
      name: "SickKids Foundation",
      url: "https://www.sickkidsfoundation.com/",
      description: "Supporting The Hospital for Sick Children in Toronto."
    },
    {
      name: "Toronto Community Housing Corporation",
      url: "https://www.torontohousing.ca/",
      description: "Providing affordable housing solutions in Toronto."
    },
    {
      name: "Yonge Street Mission",
      url: "https://www.ysm.ca/",
      description: "Supporting homeless and at-risk individuals in Toronto."
    },
    {
      name: "Covenant House Toronto",
      url: "https://www.covenanthousetoronto.ca/",
      description: "Crisis shelter and services for homeless youth."
    },
    {
      name: "Toronto Foundation",
      url: "https://www.torontofoundation.ca/",
      description: "Community foundation supporting charitable causes in Toronto."
    },
    {
      name: "Good Shepherd Centres",
      url: "https://www.goodshepherd.ca/",
      description: "Housing, health, and support services for vulnerable populations."
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
  ],

  "Police & Security Forces": [
    { title: "Royal Canadian Mounted Police (RCMP)", description: "Canada's national police force", url: "https://www.rcmp-grc.gc.ca/", icon: "fas fa-shield-alt" },
    { title: "Canada Border Services Agency (CBSA)", description: "Border security and immigration enforcement", url: "https://www.cbsa-asfc.gc.ca/", icon: "fas fa-flag-checkered" },
    { title: "Public Safety Canada", description: "National emergency preparedness and public safety", url: "https://www.publicsafety.gc.ca/", icon: "fas fa-exclamation-triangle" },
    { title: "Canadian Security Intelligence Service (CSIS)", description: "National intelligence service", url: "https://www.csis-scrs.gc.ca/", icon: "fas fa-eye" },
    { title: "Canadian Forces Military Police", description: "Military law enforcement", url: "https://www.canada.ca/en/department-national-defence/services/benefits-military/military-police.html", icon: "fas fa-user-shield" },
    { title: "Parliamentary Protective Service", description: "Security for federal Parliament", url: "https://www.parl.ca/About/House/Administrative/PPS/index-e.html", icon: "fas fa-building-shield" },
    { title: "Correctional Service Canada", description: "Federal corrections and parole", url: "https://www.csc-scc.gc.ca/", icon: "fas fa-lock" },
    { title: "Parks Canada Law Enforcement", description: "National parks and historic sites protection", url: "https://www.pc.gc.ca/en/agence-agency/law-loi", icon: "fas fa-tree" }
  ],

  "Education": [
    { title: "Universities Canada", description: "Association of Canadian universities", url: "https://www.univcan.ca/", icon: "fas fa-university" },
    { title: "Colleges and Institutes Canada", description: "National association of colleges", url: "https://www.collegesinstitutes.ca/", icon: "fas fa-school" },
    { title: "Government of Canada - Education", description: "Education policies and programs", url: "https://www.canada.ca/en/services/education.html", icon: "fas fa-graduation-cap" },
    { title: "Student Loans and Grants", description: "Financial aid for students", url: "https://www.canada.ca/en/services/benefits/education/student-aid.html", icon: "fas fa-dollar-sign" },
    { title: "Study Permits for International Students", description: "Immigration for students", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html", icon: "fas fa-passport" }
  ],

  "Embassies": [
    { title: "Global Affairs Canada", description: "International relations and diplomatic services", url: "https://www.international.gc.ca/", icon: "fas fa-globe" },
    { title: "Canadian Embassies and Consulates", description: "Diplomatic missions worldwide", url: "https://travel.gc.ca/assistance/embassies-consulates", icon: "fas fa-flag" },
    { title: "Travel Advisories", description: "Safety information for travelers", url: "https://travel.gc.ca/travelling/advisories", icon: "fas fa-exclamation-triangle" },
    { title: "Consular Services", description: "Emergency assistance for Canadians abroad", url: "https://travel.gc.ca/assistance", icon: "fas fa-hands-helping" },
    { title: "Emergency Contact", description: "24/7 emergency line for Canadians abroad", url: "tel:1-888-949-9993", icon: "fas fa-phone" }
  ],

  "Major Transportation": [
    { title: "Air Canada", description: "Canada's flag carrier airline", url: "https://www.aircanada.com/", icon: "fas fa-plane" },
    { title: "WestJet Airlines", description: "Canadian low-cost airline", url: "https://www.westjet.com/", icon: "fas fa-plane-departure" },
    { title: "VIA Rail Canada", description: "National passenger rail service", url: "https://www.viarail.ca/", icon: "fas fa-train" },
    { title: "Transport Canada", description: "Federal transportation regulations and safety", url: "https://tc.canada.ca/", icon: "fas fa-road" },
    { title: "BC Ferries", description: "Ferry services in British Columbia", url: "https://www.bcferries.com/", icon: "fas fa-ship" }
  ],

};



// Canadian Embassies Worldwide Data
const canadianEmbassiesData = {
  "North America": [
    {
      country: "United States",
      missions: [
        { name: "Embassy of Canada", city: "Washington, D.C.", address: "501 Pennsylvania Avenue, N.W., Washington, D.C., 20001", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/washington.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "New York", address: "466 Lexington Avenue, 20th Floor, New York, NY, 10017", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/new_york.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Los Angeles", address: "550 South Hope Street, 9th Floor, Los Angeles, CA, 90071", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/los_angeles.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Chicago", address: "Two Prudential Plaza, 180 North Stetson Avenue, Suite 2400, Chicago, IL, 60601", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/chicago.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Boston", address: "3 Copley Place, Suite 400, Boston, MA, 02116", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/boston.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Miami", address: "200 South Biscayne Boulevard, Suite 1600, Miami, FL, 33131", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/miami.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "San Francisco", address: "580 California Street, 14th Floor, San Francisco, CA, 94104", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/san_francisco.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Seattle", address: "1501 4th Ave, Suite 600, Seattle, WA, 98101", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/seattle.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Atlanta", address: "1175 Peachtree Street N.E., Suite 1700, Atlanta, GA, 30361", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/atlanta.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Dallas", address: "500 N. Akard Street, Suite 2900, Dallas, TX, 75201", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/dallas.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Denver", address: "1625 Broadway, Suite 2600, Denver, CO, 80202", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/denver.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Detroit", address: "600 Renaissance Center, Suite 1100, Detroit, MI, 48243", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/detroit.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Minneapolis", address: "701 Fourth Avenue South, Suite 900, Minneapolis, MN, 55415", phone: "1-844-880-6519", website: "https://www.international.gc.ca/country-pays/us-eu/minneapolis.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Mexico",
      missions: [
        { name: "Embassy of Canada", city: "Mexico City", address: "Schiller No. 529, Colonia Polanco, Mexico City, Mexico", phone: "+52 55 5724 7900", website: "https://www.international.gc.ca/country-pays/mexico-mexique/mexico_city-ville_de_mexico.aspx?lang=eng", type: "Embassy" }
      ]
    }
  ],
  "Europe": [
    {
      country: "United Kingdom",
      missions: [
        { name: "High Commission of Canada", city: "London", address: "Canada House, Trafalgar Square, London, SW1Y 5BJ", phone: "+44 (0) 207 004 6000", website: "https://www.international.gc.ca/country-pays/united_kingdom-royaume_uni/london-londres.aspx?lang=eng", type: "High Commission" },
        { name: "Honorary Consul of Canada", city: "Belfast", address: "Northern Ireland", phone: "+44 (0) 207 004 6000", website: "https://www.international.gc.ca/country-pays/united_kingdom-royaume_uni/belfast.aspx?lang=eng", type: "Honorary Consul" },
        { name: "Honorary Consul of Canada", city: "Edinburgh", address: "Scotland", phone: "+44 (0) 207 004 6000", website: "https://www.international.gc.ca/country-pays/united_kingdom-royaume_uni/edinburgh-edimbourg.aspx?lang=eng", type: "Honorary Consul" },
        { name: "Honorary Consul of Canada", city: "Cardiff", address: "Wales", phone: "+44 (0) 207 004 6000", website: "https://www.international.gc.ca/country-pays/united_kingdom-royaume_uni/cardiff.aspx?lang=eng", type: "Honorary Consul" }
      ]
    },
    {
      country: "France",
      missions: [
        { name: "Embassy of Canada", city: "Paris", address: "130, rue du Faubourg Saint-Honoré, 75008 Paris", phone: "+33 (0)1 44 43 29 02", website: "https://www.international.gc.ca/country-pays/france/paris.aspx?lang=eng", type: "Embassy" },
        { name: "Honorary Consul of Canada", city: "Nice", address: "37, boulevard Dubouchage – 1st floor, 06000 Nice", phone: "+33 (0)1 44 43 29 02", website: "https://www.international.gc.ca/country-pays/france/nice.aspx?lang=eng", type: "Honorary Consul" },
        { name: "Honorary Consul of Canada", city: "Lyon", address: "3, place de la Bourse, 69002 Lyon", phone: "+33 (0)1 44 43 29 02", website: "https://www.international.gc.ca/country-pays/france/lyon.aspx?lang=eng", type: "Honorary Consul" }
      ]
    },
    {
      country: "Germany",
      missions: [
        { name: "Embassy of Canada", city: "Berlin", address: "Leipziger Platz 17, 10117 Berlin", phone: "+49 30 20312-0", website: "https://www.international.gc.ca/country-pays/germany-allemagne/berlin.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "Munich", address: "Tal 29, 80331 Munich", phone: "+49 89 219 9570", website: "https://www.international.gc.ca/country-pays/germany-allemagne/munich.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Italy",
      missions: [
        { name: "Embassy of Canada", city: "Rome", address: "Via Zara 30, 00198 Rome", phone: "+39 06 854441", website: "https://www.international.gc.ca/country-pays/italy-italie/rome.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Spain",
      missions: [
        { name: "Embassy of Canada", city: "Madrid", address: "Torre Espacio, Paseo de la Castellana 259D, 28046 Madrid", phone: "+34 91 382 8400", website: "https://www.international.gc.ca/country-pays/spain-espagne/madrid.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Netherlands",
      missions: [
        { name: "Embassy of Canada", city: "The Hague", address: "Sophialaan 7, 2514 JP The Hague", phone: "+31 70 311 1600", website: "https://www.international.gc.ca/country-pays/netherlands-pays_bas/the_hague-la_haye.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Belgium",
      missions: [
        { name: "Embassy of Canada", city: "Brussels", address: "Avenue de Tervueren 2, 1040 Brussels", phone: "+32 2 741 06 11", website: "https://www.international.gc.ca/country-pays/belgium-belgique/brussels-bruxelles.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Switzerland",
      missions: [
        { name: "Embassy of Canada", city: "Bern", address: "Kirchenfeldstrasse 88, 3005 Bern", phone: "+41 31 357 32 00", website: "https://www.international.gc.ca/country-pays/switzerland-suisse/bern-berne.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Austria",
      missions: [
        { name: "Embassy of Canada", city: "Vienna", address: "Laurenzerberg 2, 1010 Vienna", phone: "+43 1 531 38 3000", website: "https://www.international.gc.ca/country-pays/austria-autriche/vienna-vienne.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Sweden",
      missions: [
        { name: "Embassy of Canada", city: "Stockholm", address: "Klarabergsgatan 23, 111 21 Stockholm", phone: "+46 8 453 3000", website: "https://www.international.gc.ca/country-pays/sweden-suede/stockholm.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Norway",
      missions: [
        { name: "Embassy of Canada", city: "Oslo", address: "Wergelandsveien 7, 0244 Oslo", phone: "+47 22 99 53 00", website: "https://www.international.gc.ca/country-pays/norway-norvege/oslo.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Denmark",
      missions: [
        { name: "Embassy of Canada", city: "Copenhagen", address: "Kristen Bernikows Gade 1, 1105 Copenhagen", phone: "+45 33 48 32 00", website: "https://www.international.gc.ca/country-pays/denmark-danemark/copenhagen-copenhague.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Finland",
      missions: [
        { name: "Embassy of Canada", city: "Helsinki", address: "Pohjoisesplanadi 25B, 00100 Helsinki", phone: "+358 9 228 530", website: "https://www.international.gc.ca/country-pays/finland-finlande/helsinki.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Poland",
      missions: [
        { name: "Embassy of Canada", city: "Warsaw", address: "ul. Jana Matejki 1/5, 00-481 Warsaw", phone: "+48 22 584 3100", website: "https://www.international.gc.ca/country-pays/poland-pologne/warsaw-varsovie.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Czech Republic",
      missions: [
        { name: "Embassy of Canada", city: "Prague", address: "Nerudova 3, 118 00 Prague 1", phone: "+420 272 101 800", website: "https://www.international.gc.ca/country-pays/czech_republic-republique_tcheque/prague.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Hungary",
      missions: [
        { name: "Embassy of Canada", city: "Budapest", address: "Ganz utca 12-14, 1027 Budapest", phone: "+36 1 392 3360", website: "https://www.international.gc.ca/country-pays/hungary-hongrie/budapest.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Romania",
      missions: [
        { name: "Embassy of Canada", city: "Bucharest", address: "Tuberozelor Street 1-3, 011411 Bucharest", phone: "+40 21 307 5000", website: "https://www.international.gc.ca/country-pays/romania-roumanie/bucharest-bucarest.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Greece",
      missions: [
        { name: "Embassy of Canada", city: "Athens", address: "Ethnikis Antistaseos 48, 152 31 Chalandri", phone: "+30 210 727 3400", website: "https://www.international.gc.ca/country-pays/greece-grece/athens-athenes.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Portugal",
      missions: [
        { name: "Embassy of Canada", city: "Lisbon", address: "Avenida da Liberdade 198-200, 1269-121 Lisbon", phone: "+351 21 316 4600", website: "https://www.international.gc.ca/country-pays/portugal/lisbon-lisbonne.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Ireland",
      missions: [
        { name: "Embassy of Canada", city: "Dublin", address: "7-8 Wilton Terrace, Dublin 2", phone: "+353 1 234 4000", website: "https://www.international.gc.ca/country-pays/ireland-irlande/dublin.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Russia",
      missions: [
        { name: "Embassy of Canada", city: "Moscow", address: "Starokonyushenny Pereulok 23, 119002 Moscow", phone: "+7 495 105 6000", website: "https://www.international.gc.ca/country-pays/russia-russie/moscow-moscou.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Ukraine",
      missions: [
        { name: "Embassy of Canada", city: "Kyiv", address: "Klovsky uzviz 13A, 01021 Kyiv", phone: "+380 44 590 1100", website: "https://www.international.gc.ca/country-pays/ukraine/kyiv-kiev.aspx?lang=eng", type: "Embassy" }
      ]
    }
  ],
  "Asia": [
    {
      country: "China",
      missions: [
        { name: "Embassy of Canada", city: "Beijing", address: "19 Dongzhimenwai Dajie, Chaoyang District, Beijing 100600", phone: "+86 10 5139 4000", website: "https://www.international.gc.ca/country-pays/china-chine/beijing-pekin.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "Shanghai", address: "ECO City, 1788 Nanjing Road West, 8th Floor, Shanghai 200040", phone: "+86 21 3279 2800", website: "https://www.international.gc.ca/country-pays/china-chine/shanghai.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Guangzhou", address: "China Hotel Office Tower, Suite 801, Liu Hua Road, Guangzhou 510015", phone: "+86 20 8666 0569", website: "https://www.international.gc.ca/country-pays/china-chine/guangzhou.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Chongqing", address: "17th Floor, Metropolitan Tower, 68 Zourong Road, Yuzhong District, Chongqing 400010", phone: "+86 23 6373 8007", website: "https://www.international.gc.ca/country-pays/china-chine/chongqing.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Japan",
      missions: [
        { name: "Embassy of Canada", city: "Tokyo", address: "7-3-38 Akasaka, Minato-ku, Tokyo 107-8503", phone: "+81 3 5412 6200", website: "https://www.international.gc.ca/country-pays/japan-japon/tokyo.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "South Korea",
      missions: [
        { name: "Embassy of Canada", city: "Seoul", address: "21 Jeongdong-gil, Jung-gu, Seoul 04518", phone: "+82 2 3783 6000", website: "https://www.international.gc.ca/country-pays/south_korea-coree_du_sud/seoul.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "India",
      missions: [
        { name: "High Commission of Canada", city: "New Delhi", address: "7/8 Shantipath, Chanakyapuri, New Delhi 110021", phone: "+91 11 4178 2000", website: "https://www.international.gc.ca/country-pays/india-inde/new_delhi-nouvelle_delhi.aspx?lang=eng", type: "High Commission" },
        { name: "Consulate General of Canada", city: "Mumbai", address: "Makers Chambers IV, 9th Floor, 222 Nariman Point, Mumbai 400021", phone: "+91 22 6749 4444", website: "https://www.international.gc.ca/country-pays/india-inde/mumbai.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Chandigarh", address: "SCO 55-56, Sector 17-A, Chandigarh 160017", phone: "+91 172 5012900", website: "https://www.international.gc.ca/country-pays/india-inde/chandigarh.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Singapore",
      missions: [
        { name: "High Commission of Canada", city: "Singapore", address: "One George Street, #11-01, Singapore 049145", phone: "+65 6854 5900", website: "https://www.international.gc.ca/country-pays/singapore-singapour/singapore-singapour.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Thailand",
      missions: [
        { name: "Embassy of Canada", city: "Bangkok", address: "Abdulrahim Place, 15th Floor, 990 Rama IV Road, Bangkok 10500", phone: "+66 2 636 0540", website: "https://www.international.gc.ca/country-pays/thailand-thailande/bangkok.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Indonesia",
      missions: [
        { name: "Embassy of Canada", city: "Jakarta", address: "World Trade Centre, 6th Floor, Jl. Jend. Sudirman Kav. 29-31, Jakarta 12920", phone: "+62 21 2550 7800", website: "https://www.international.gc.ca/country-pays/indonesia-indonesie/jakarta.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Malaysia",
      missions: [
        { name: "High Commission of Canada", city: "Kuala Lumpur", address: "17th Floor, Menara Tan & Tan, 207 Jalan Tun Razak, Kuala Lumpur 50400", phone: "+60 3 2718 3333", website: "https://www.international.gc.ca/country-pays/malaysia-malaisie/kuala_lumpur.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Philippines",
      missions: [
        { name: "Embassy of Canada", city: "Manila", address: "Levels 6-8, Tower 2, RCBC Plaza, 6819 Ayala Avenue, Makati City 1200", phone: "+63 2 857 9000", website: "https://www.international.gc.ca/country-pays/philippines/manila-manille.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Vietnam",
      missions: [
        { name: "Embassy of Canada", city: "Hanoi", address: "31 Hung Vuong Street, Ba Dinh District, Hanoi", phone: "+84 24 3734 5000", website: "https://www.international.gc.ca/country-pays/vietnam/hanoi.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "Ho Chi Minh City", address: "235 Dong Khoi Street, District 1, Ho Chi Minh City", phone: "+84 28 3827 9899", website: "https://www.international.gc.ca/country-pays/vietnam/ho_chi_minh_city-ville_ho_chi_minh.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Bangladesh",
      missions: [
        { name: "High Commission of Canada", city: "Dhaka", address: "United Nations Road, Baridhara, Dhaka 1212", phone: "+880 2 5566 7091", website: "https://www.international.gc.ca/country-pays/bangladesh/dhaka.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Pakistan",
      missions: [
        { name: "High Commission of Canada", city: "Islamabad", address: "Diplomatic Enclave, Sector G-5, Islamabad", phone: "+92 51 208 6000", website: "https://www.international.gc.ca/country-pays/pakistan/islamabad.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Afghanistan",
      missions: [
        { name: "Embassy of Canada", city: "Kabul", address: "Wazir Akbar Khan, Kabul (Currently suspended)", phone: "Contact via Dubai", website: "https://www.international.gc.ca/country-pays/afghanistan/kabul.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Sri Lanka",
      missions: [
        { name: "High Commission of Canada", city: "Colombo", address: "33A, 5th Lane, Colombo 03", phone: "+94 11 522 6232", website: "https://www.international.gc.ca/country-pays/sri_lanka/colombo.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Myanmar",
      missions: [
        { name: "Embassy of Canada", city: "Yangon", address: "88 Kanbawza Road, Golden Valley, Yangon", phone: "+95 1 384 805", website: "https://www.international.gc.ca/country-pays/myanmar/yangon.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Cambodia",
      missions: [
        { name: "Embassy of Canada", city: "Phnom Penh", address: "Villa 9, Street 254, Sangkat Chaktomuk, Phnom Penh", phone: "+855 23 213 470", website: "https://www.international.gc.ca/country-pays/cambodia-cambodge/phnom_penh.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Laos",
      missions: [
        { name: "Embassy of Canada", city: "Vientiane", address: "Nehru Street, Phonexay Village, Vientiane", phone: "+856 21 223 734", website: "https://www.international.gc.ca/country-pays/laos/vientiane.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Mongolia",
      missions: [
        { name: "Embassy of Canada", city: "Ulaanbaatar", address: "Central Tower, Suite 608, Sukhbaatar Square 2, Ulaanbaatar 14200", phone: "+976 11 332 500", website: "https://www.international.gc.ca/country-pays/mongolia-mongolie/ulaanbaatar.aspx?lang=eng", type: "Embassy" }
      ]
    }
  ],
  "Africa": [
    {
      country: "South Africa",
      missions: [
        { name: "High Commission of Canada", city: "Pretoria", address: "1103 Arcadia Street, Hatfield, Pretoria 0028", phone: "+27 12 422 3000", website: "https://www.international.gc.ca/country-pays/south_africa-afrique_du_sud/pretoria.aspx?lang=eng", type: "High Commission" },
        { name: "Consulate General of Canada", city: "Cape Town", address: "Reserve Bank Building, 15th Floor, 60 St George's Mall, Cape Town 8001", phone: "+27 21 423 5240", website: "https://www.international.gc.ca/country-pays/south_africa-afrique_du_sud/cape_town-cap.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Egypt",
      missions: [
        { name: "Embassy of Canada", city: "Cairo", address: "26 Kamel El Shenawy Street, Garden City, Cairo", phone: "+20 2 2791 8700", website: "https://www.international.gc.ca/country-pays/egypt-egypte/cairo-le_caire.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Kenya",
      missions: [
        { name: "High Commission of Canada", city: "Nairobi", address: "Limuru Road, Gigiri, Nairobi", phone: "+254 20 366 3000", website: "https://www.international.gc.ca/country-pays/kenya/nairobi.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Ghana",
      missions: [
        { name: "High Commission of Canada", city: "Accra", address: "42 Independence Avenue, Accra", phone: "+233 30 221 1521", website: "https://www.international.gc.ca/country-pays/ghana/accra.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Nigeria",
      missions: [
        { name: "High Commission of Canada", city: "Abuja", address: "15 Bobo Street, Maitama, Abuja", phone: "+234 9 461 2900", website: "https://www.international.gc.ca/country-pays/nigeria/abuja.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Morocco",
      missions: [
        { name: "Embassy of Canada", city: "Rabat", address: "13 bis, Rue Jaafar As-Sadik, Agdal, Rabat", phone: "+212 5 37 68 74 00", website: "https://www.international.gc.ca/country-pays/morocco-maroc/rabat.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Algeria",
      missions: [
        { name: "Embassy of Canada", city: "Algiers", address: "18 Rue Mustapha Khalef, Ben Aknoun, Algiers", phone: "+213 21 91 06 11", website: "https://www.international.gc.ca/country-pays/algeria-algerie/algiers-alger.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Tunisia",
      missions: [
        { name: "Embassy of Canada", city: "Tunis", address: "3 Rue du Sénégal, Place d'Afrique, Tunis", phone: "+216 71 104 000", website: "https://www.international.gc.ca/country-pays/tunisia-tunisie/tunis.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Senegal",
      missions: [
        { name: "Embassy of Canada", city: "Dakar", address: "45 Avenue de la République, Dakar", phone: "+221 33 889 4700", website: "https://www.international.gc.ca/country-pays/senegal/dakar.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Côte d'Ivoire",
      missions: [
        { name: "Embassy of Canada", city: "Abidjan", address: "Immeuble Trade Center, 01 BP 4104, Abidjan 01", phone: "+225 20 30 07 00", website: "https://www.international.gc.ca/country-pays/cote_d_ivoire-cote_d_ivoire/abidjan.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Cameroon",
      missions: [
        { name: "High Commission of Canada", city: "Yaoundé", address: "Avenue Rosa Parks, Yaoundé", phone: "+237 22 220 6300", website: "https://www.international.gc.ca/country-pays/cameroon-cameroun/yaounde.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Democratic Republic of Congo",
      missions: [
        { name: "Embassy of Canada", city: "Kinshasa", address: "17 Avenue Pumbu, Gombe, Kinshasa", phone: "+243 81 551 2900", website: "https://www.international.gc.ca/country-pays/congo_kinshasa/kinshasa.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Tanzania",
      missions: [
        { name: "High Commission of Canada", city: "Dar es Salaam", address: "Plot 1027, Msasani Peninsula, Dar es Salaam", phone: "+255 22 211 2831", website: "https://www.international.gc.ca/country-pays/tanzania-tanzanie/dar_es_salaam.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Ethiopia",
      missions: [
        { name: "Embassy of Canada", city: "Addis Ababa", address: "Kirkos Sub-City, Kebele 04, House Number 122, Addis Ababa", phone: "+251 11 371 0022", website: "https://www.international.gc.ca/country-pays/ethiopia-ethiopie/addis_ababa.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Zimbabwe",
      missions: [
        { name: "Embassy of Canada", city: "Harare", address: "45 Baines Avenue, Harare", phone: "+263 4 252 181", website: "https://www.international.gc.ca/country-pays/zimbabwe/harare.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Mozambique",
      missions: [
        { name: "High Commission of Canada", city: "Maputo", address: "1138 Rua Kenneth Kaunda, Maputo", phone: "+258 21 492 623", website: "https://www.international.gc.ca/country-pays/mozambique/maputo.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Angola",
      missions: [
        { name: "Embassy of Canada", city: "Luanda", address: "Rua Rei Katyavala 113, Luanda", phone: "+244 222 348 296", website: "https://www.international.gc.ca/country-pays/angola/luanda.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Mali",
      missions: [
        { name: "Embassy of Canada", city: "Bamako", address: "Immmeuble Séméga, Route de Koulikoro, Bamako", phone: "+223 2021 2236", website: "https://www.international.gc.ca/country-pays/mali/bamako.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Burkina Faso",
      missions: [
        { name: "Embassy of Canada", city: "Ouagadougou", address: "316 Avenue Kwamé N'Krumah, Ouagadougou", phone: "+226 25 49 09 00", website: "https://www.international.gc.ca/country-pays/burkina_faso/ouagadougou.aspx?lang=eng", type: "Embassy" }
      ]
    }
  ],
  "South America": [
    {
      country: "Brazil",
      missions: [
        { name: "Embassy of Canada", city: "Brasília", address: "SES Av. das Nações, Qd. 803, Lt. 16, Brasília, DF 70410-900", phone: "+55 61 3424 5400", website: "https://www.international.gc.ca/country-pays/brazil-bresil/brasilia.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "São Paulo", address: "Av. das Nações Unidas, 12901, Torre Norte, 16° andar, São Paulo, SP 04578-000", phone: "+55 11 5509 4321", website: "https://www.international.gc.ca/country-pays/brazil-bresil/sao_paulo.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Rio de Janeiro", address: "Av. Atlântica, 1130, 5° andar, Copacabana, Rio de Janeiro, RJ 22021-000", phone: "+55 21 2543 3004", website: "https://www.international.gc.ca/country-pays/brazil-bresil/rio_de_janeiro.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Argentina",
      missions: [
        { name: "Embassy of Canada", city: "Buenos Aires", address: "Tagle 2828, C1425EEH Buenos Aires", phone: "+54 11 4808 1000", website: "https://www.international.gc.ca/country-pays/argentina-argentine/buenos_aires.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Chile",
      missions: [
        { name: "Embassy of Canada", city: "Santiago", address: "Nueva Tajamar 481, Torre Norte, Piso 12, Las Condes, Santiago", phone: "+56 2 2652 3800", website: "https://www.international.gc.ca/country-pays/chile-chili/santiago.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Colombia",
      missions: [
        { name: "Embassy of Canada", city: "Bogotá", address: "Carrera 7 No. 114-33, Piso 14, Bogotá", phone: "+57 1 657 9800", website: "https://www.international.gc.ca/country-pays/colombia-colombie/bogota.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Peru",
      missions: [
        { name: "Embassy of Canada", city: "Lima", address: "Calle Bolognesi 228, Miraflores, Lima 18", phone: "+51 1 319 3200", website: "https://www.international.gc.ca/country-pays/peru-perou/lima.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Ecuador",
      missions: [
        { name: "Embassy of Canada", city: "Quito", address: "Av. 6 de Diciembre N36-64 y Paul Rivet, Quito", phone: "+593 2 2232 114", website: "https://www.international.gc.ca/country-pays/ecuador-equateur/quito.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Venezuela",
      missions: [
        { name: "Embassy of Canada", city: "Caracas", address: "Av. Francisco de Miranda, Torre Europa, Piso 7, Campo Alegre, Caracas", phone: "+58 212 600 3000", website: "https://www.international.gc.ca/country-pays/venezuela/caracas.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Uruguay",
      missions: [
        { name: "Embassy of Canada", city: "Montevideo", address: "Plaza Independencia 749, Oficina 102, Montevideo", phone: "+598 2 902 2030", website: "https://www.international.gc.ca/country-pays/uruguay/montevideo.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Bolivia",
      missions: [
        { name: "Embassy of Canada", city: "La Paz", address: "Av. 20 de Octubre 2475, Edificio Multicentro, Torre A, Piso 15, La Paz", phone: "+591 2 215 2000", website: "https://www.international.gc.ca/country-pays/bolivia-bolivie/la_paz.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Paraguay",
      missions: [
        { name: "Embassy of Canada", city: "Asunción", address: "Prof. Ramirez 1229, Asunción", phone: "+595 21 227 207", website: "https://www.international.gc.ca/country-pays/paraguay/asuncion.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Guyana",
      missions: [
        { name: "High Commission of Canada", city: "Georgetown", address: "High and Young Streets, Georgetown", phone: "+592 227 2081", website: "https://www.international.gc.ca/country-pays/guyana/georgetown.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Suriname",
      missions: [
        { name: "Embassy of Canada", city: "Paramaribo", address: "Gravenberchstraat 1, Paramaribo", phone: "+597 424 305", website: "https://www.international.gc.ca/country-pays/suriname/paramaribo.aspx?lang=eng", type: "Embassy" }
      ]
    }
  ],
  "Oceania": [
    {
      country: "Australia",
      missions: [
        { name: "High Commission of Canada", city: "Canberra", address: "Commonwealth Avenue, Canberra, ACT 2600", phone: "+61 2 6270 4000", website: "https://www.international.gc.ca/country-pays/australia-australie/canberra.aspx?lang=eng", type: "High Commission" },
        { name: "Consulate General of Canada", city: "Sydney", address: "Level 5, 111 Harrington Street, Sydney, NSW 2000", phone: "+61 2 9364 3000", website: "https://www.international.gc.ca/country-pays/australia-australie/sydney.aspx?lang=eng", type: "Consulate General" },
        { name: "Consulate General of Canada", city: "Perth", address: "267 St Georges Terrace, Perth, WA 6000", phone: "+61 8 9322 7930", website: "https://www.international.gc.ca/country-pays/australia-australie/perth.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "New Zealand",
      missions: [
        { name: "High Commission of Canada", city: "Wellington", address: "Level 11, 125 The Terrace, Wellington 6011", phone: "+64 4 473 9577", website: "https://www.international.gc.ca/country-pays/new_zealand-nouvelle_zelande/wellington.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Fiji",
      missions: [
        { name: "High Commission of Canada", city: "Suva", address: "37 Gorrie Street, Suva", phone: "+679 330 4500", website: "https://www.international.gc.ca/country-pays/fiji-fidji/suva.aspx?lang=eng", type: "High Commission" }
      ]
    },
    {
      country: "Papua New Guinea",
      missions: [
        { name: "High Commission of Canada", city: "Port Moresby", address: "Level 6, Credit House, Cuthbertson Street, Port Moresby", phone: "+675 213 0300", website: "https://www.international.gc.ca/country-pays/papua_new_guinea-papouasie_nouvelle_guinee/port_moresby.aspx?lang=eng", type: "High Commission" }
      ]
    }
  ],
  "Middle East": [
    {
      country: "Israel",
      missions: [
        { name: "Embassy of Canada", city: "Tel Aviv", address: "3 Nirim Street, Tel Aviv 67060", phone: "+972 3 636 3300", website: "https://www.international.gc.ca/country-pays/israel-israel/tel_aviv.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Jordan",
      missions: [
        { name: "Embassy of Canada", city: "Amman", address: "Pearl of Shmeisani, Building 130, 5th Floor, Shmeisani, Amman", phone: "+962 6 520 3300", website: "https://www.international.gc.ca/country-pays/jordan-jordanie/amman.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Lebanon",
      missions: [
        { name: "Embassy of Canada", city: "Beirut", address: "Coolrite Building, 43 Jal El Dib Highway, Jal El Dib", phone: "+961 4 726 700", website: "https://www.international.gc.ca/country-pays/lebanon-liban/beirut-beyrouth.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "United Arab Emirates",
      missions: [
        { name: "Embassy of Canada", city: "Abu Dhabi", address: "Khalifa Business Park, Al Qurm District, Abu Dhabi", phone: "+971 2 694 0300", website: "https://www.international.gc.ca/country-pays/united_arab_emirates-emirats_arabes_unis/abu_dhabi.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "Dubai", address: "Jumeirah Emirates Towers, Level 9-10, Dubai", phone: "+971 4 404 8444", website: "https://www.international.gc.ca/country-pays/united_arab_emirates-emirats_arabes_unis/dubai.aspx?lang=eng", type: "Consulate General" }
      ]
    },
    {
      country: "Saudi Arabia",
      missions: [
        { name: "Embassy of Canada", city: "Riyadh", address: "Diplomatic Quarter, Riyadh", phone: "+966 11 488 2288", website: "https://www.international.gc.ca/country-pays/saudi_arabia-arabie_saoudite/riyadh-riyad.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Kuwait",
      missions: [
        { name: "Embassy of Canada", city: "Kuwait City", address: "Villa 24, Block 4, Da'iya Area, Kuwait City", phone: "+965 2256 3025", website: "https://www.international.gc.ca/country-pays/kuwait-koweit/kuwait_city-ville_de_koweit.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Qatar",
      missions: [
        { name: "Embassy of Canada", city: "Doha", address: "Tornado Tower, Level 8, West Bay, Doha", phone: "+974 4419 8000", website: "https://www.international.gc.ca/country-pays/qatar/doha.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Oman",
      missions: [
        { name: "Embassy of Canada", city: "Muscat", address: "Jameat A'Duwal Al Arabiyya Street, Diplomatic Area, Muscat", phone: "+968 24 694 400", website: "https://www.international.gc.ca/country-pays/oman/muscat.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Bahrain",
      missions: [
        { name: "Embassy of Canada", city: "Manama", address: "Building 25, Road 1901, Block 319, Diplomatic Area, Manama", phone: "+973 1736 1122", website: "https://www.international.gc.ca/country-pays/bahrain-bahrein/manama.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Iran",
      missions: [
        { name: "Embassy of Canada", city: "Tehran", address: "No. 55, Shahid Javad-Al-Aemeh Street, Tehran (Currently suspended)", phone: "Contact via Ankara", website: "https://www.international.gc.ca/country-pays/iran/tehran.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Iraq",
      missions: [
        { name: "Embassy of Canada", city: "Baghdad", address: "International Zone, Baghdad", phone: "+964 1 538 7619", website: "https://www.international.gc.ca/country-pays/iraq-irak/baghdad.aspx?lang=eng", type: "Embassy" }
      ]
    },
    {
      country: "Turkey",
      missions: [
        { name: "Embassy of Canada", city: "Ankara", address: "Cinnah Caddesi No. 58, Çankaya, Ankara", phone: "+90 312 409 2700", website: "https://www.international.gc.ca/country-pays/turkey-turquie/ankara.aspx?lang=eng", type: "Embassy" },
        { name: "Consulate General of Canada", city: "Istanbul", address: "Büyükdere Caddesi No. 209, Tekfen Tower, 16th Floor, Istanbul", phone: "+90 212 385 9700", website: "https://www.international.gc.ca/country-pays/turkey-turquie/istanbul.aspx?lang=eng", type: "Consulate General" }
      ]
    }
  ]
};

// Canadian Colleges and Universities Data
const canadianEducationData = {
  "Top Universities": [
    { name: "University of Toronto", url: "https://www.utoronto.ca/", description: "Canada's top-ranked university with 97,000+ students", province: "Ontario", type: "University" },
    { name: "University of British Columbia", url: "https://www.ubc.ca/", description: "Leading research university with campuses in Vancouver and Okanagan", province: "British Columbia", type: "University" },
    { name: "McGill University", url: "https://www.mcgill.ca/", description: "Prestigious research university in Montreal", province: "Quebec", type: "University" },
    { name: "McMaster University", url: "https://www.mcmaster.ca/", description: "Renowned for health sciences and problem-based learning", province: "Ontario", type: "University" },
    { name: "University of Alberta", url: "https://www.ualberta.ca/", description: "Leading research university with 200+ programs", province: "Alberta", type: "University" },
    { name: "University of Waterloo", url: "https://uwaterloo.ca/", description: "World-renowned for engineering and computer science", province: "Ontario", type: "University" },
    { name: "University of Montreal", url: "https://www.umontreal.ca/", description: "Major French-language research university", province: "Quebec", type: "University" },
    { name: "University of Calgary", url: "https://www.ucalgary.ca/", description: "Comprehensive research university known for energy studies", province: "Alberta", type: "University" }
  ],
  "Major Polytechnics": [
    { name: "British Columbia Institute of Technology (BCIT)", url: "https://www.bcit.ca/", description: "Leading polytechnic with applied technology programs", province: "British Columbia", type: "Polytechnic" },
    { name: "Seneca Polytechnic", url: "https://www.senecapolytechnic.ca/", description: "Toronto's largest polytechnic with diverse programs", province: "Ontario", type: "Polytechnic" },
    { name: "Humber Polytechnic", url: "https://www.humber.ca/", description: "Comprehensive polytechnic with strong industry connections", province: "Ontario", type: "Polytechnic" },
    { name: "Northern Alberta Institute of Technology (NAIT)", url: "https://www.nait.ca/", description: "Leading technical institute in Western Canada", province: "Alberta", type: "Polytechnic" },
    { name: "Southern Alberta Institute of Technology (SAIT)", url: "https://www.sait.ca/", description: "Applied learning and technology institute", province: "Alberta", type: "Polytechnic" },
    { name: "Red River College Polytechnic", url: "https://www.rrc.ca/", description: "Manitoba's largest polytechnic institution", province: "Manitoba", type: "Polytechnic" },
    { name: "Saskatchewan Polytechnic", url: "https://www.saskpolytech.ca/", description: "Saskatchewan's primary polytechnic institution", province: "Saskatchewan", type: "Polytechnic" }
  ],
  "Quebec CEGEPs": [
    { name: "Dawson College", url: "https://www.dawsoncollege.qc.ca/", description: "Leading English CEGEP in Montreal", province: "Quebec", type: "CEGEP" },
    { name: "Vanier College", url: "https://www.vaniercollege.qc.ca/", description: "English CEGEP with diverse programs", province: "Quebec", type: "CEGEP" },
    { name: "John Abbott College", url: "https://www.johnabbott.qc.ca/", description: "English CEGEP in Montreal's West Island", province: "Quebec", type: "CEGEP" },
    { name: "Champlain College", url: "https://www.champlaincollege.qc.ca/", description: "English CEGEP with multiple campuses", province: "Quebec", type: "CEGEP" },
    { name: "Cégep de Sainte-Foy", url: "https://www.cegep-ste-foy.qc.ca/", description: "French CEGEP in Quebec City", province: "Quebec", type: "CEGEP" },
    { name: "Cégep du Vieux Montréal", url: "https://www.cvm.qc.ca/", description: "Historic French CEGEP in Montreal", province: "Quebec", type: "CEGEP" }
  ],
  "Community Colleges": [
    { name: "George Brown College", url: "https://www.georgebrown.ca/", description: "Toronto-based college with career-focused programs", province: "Ontario", type: "College" },
    { name: "Algonquin College", url: "https://www.algonquincollege.com/", description: "Ottawa's largest college with over 300 programs", province: "Ontario", type: "College" },
    { name: "Mohawk College", url: "https://www.mohawkcollege.ca/", description: "Hamilton-based college with applied arts and technology", province: "Ontario", type: "College" },
    { name: "Vancouver Community College", url: "https://www.vcc.ca/", description: "Vancouver's community college with diverse programs", province: "British Columbia", type: "College" },
    { name: "Langara College", url: "https://www.langara.ca/", description: "Vancouver college known for university transfer programs", province: "British Columbia", type: "College" },
    { name: "Nova Scotia Community College", url: "https://www.nscc.ca/", description: "Province-wide college system with 13 campuses", province: "Nova Scotia", type: "College" },
    { name: "New Brunswick Community College", url: "https://www.nbcc.ca/", description: "Bilingual college system across New Brunswick", province: "New Brunswick", type: "College" },
    { name: "College of the North Atlantic", url: "https://www.cna.nl.ca/", description: "Newfoundland and Labrador's largest college", province: "Newfoundland and Labrador", type: "College" }
  ],
  "Official Resources": [
    { name: "Universities Canada", url: "https://www.univcan.ca/", description: "Official association representing Canadian universities", province: "National", type: "Resource" },
    { name: "Colleges and Institutes Canada", url: "https://www.collegesinstitutes.ca/", description: "National association for colleges and institutes", province: "National", type: "Resource" },
    { name: "Polytechnics Canada", url: "https://polytechnicscanada.ca/", description: "Association of leading polytechnic institutions", province: "National", type: "Resource" },
    { name: "Government of Canada - Study in Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html", description: "Official guide for international students", province: "National", type: "Resource" },
    { name: "EduCanada", url: "https://www.educanada.ca/", description: "Official portal for international education in Canada", province: "National", type: "Resource" },
    { name: "StudentAid BC", url: "https://studentaidbc.ca/", description: "Student financial aid for British Columbia", province: "British Columbia", type: "Resource" }
  ]
};

// Canadian Police & Security Forces Data
const canadianPoliceSecurityData = {
  "Federal Agencies": [
    { name: "Royal Canadian Mounted Police (RCMP)", description: "Canada's national police force providing federal, provincial, and municipal law enforcement", type: "Federal Police", website: "https://www.rcmp-grc.gc.ca/" },
    { name: "Canada Border Services Agency (CBSA)", description: "Border security, immigration enforcement, and customs operations", type: "Border Security", website: "https://www.cbsa-asfc.gc.ca/" },
    { name: "Canadian Security Intelligence Service (CSIS)", description: "National intelligence and security service", type: "Intelligence", website: "https://www.csis-scrs.gc.ca/" },
    { name: "Canadian Forces Military Police", description: "Military law enforcement and security for Canadian Armed Forces", type: "Military Police", website: "https://www.canada.ca/en/department-national-defence/services/benefits-military/military-police.html" },
    { name: "Parliamentary Protective Service", description: "Security and law enforcement for Parliament Hill and parliamentary precinct", type: "Parliamentary Security", website: "https://www.parl.ca/About/House/Administrative/PPS/index-e.html" },
    { name: "Correctional Service Canada", description: "Federal corrections and conditional release supervision", type: "Corrections", website: "https://www.csc-scc.gc.ca/" },
    { name: "Parks Canada Law Enforcement", description: "Protection and enforcement in national parks and historic sites", type: "Parks Enforcement", website: "https://www.pc.gc.ca/en/agence-agency/law-loi" },
    { name: "Transport Canada Enforcement", description: "Transportation safety and security enforcement", type: "Transport Security", website: "https://tc.canada.ca/en/corporate-services/enforcement" }
  ],
  "Provincial Police": [
    { name: "Ontario Provincial Police (OPP)", description: "Provincial police service for Ontario communities without municipal police", type: "Provincial Police", website: "https://www.opp.ca/" },
    { name: "Sûreté du Québec (SQ)", description: "Quebec provincial police providing provincial and municipal services", type: "Provincial Police", website: "https://www.sq.gouv.qc.ca/" },
    { name: "Royal Newfoundland Constabulary", description: "Provincial police service for major urban centers in Newfoundland and Labrador", type: "Provincial Police", website: "https://www.rnc.gov.nl.ca/" }
  ],
  "Major Municipal Police": [
    { name: "Toronto Police Service", description: "Municipal police service for the City of Toronto", type: "Municipal Police", website: "https://www.torontopolice.on.ca/" },
    { name: "Vancouver Police Department", description: "Municipal police service for the City of Vancouver", type: "Municipal Police", website: "https://vancouver.ca/police/" },
    { name: "Calgary Police Service", description: "Municipal police service for the City of Calgary", type: "Municipal Police", website: "https://www.calgary.ca/cps.html" },
    { name: "Edmonton Police Service", description: "Municipal police service for the City of Edmonton", type: "Municipal Police", website: "https://www.edmontonpolice.ca/" },
    { name: "Ottawa Police Service", description: "Municipal police service for the City of Ottawa", type: "Municipal Police", website: "https://www.ottawapolice.ca/" },
    { name: "Winnipeg Police Service", description: "Municipal police service for the City of Winnipeg", type: "Municipal Police", website: "https://www.winnipeg.ca/police/" },
    { name: "Hamilton Police Service", description: "Municipal police service for the City of Hamilton", type: "Municipal Police", website: "https://hamiltonpolice.on.ca/" },
    { name: "York Regional Police", description: "Regional police service for York Region, Ontario", type: "Regional Police", website: "https://www.yrp.ca/" },
    { name: "Peel Regional Police", description: "Regional police service for Peel Region, Ontario", type: "Regional Police", website: "https://www.peelpolice.ca/" },
    { name: "Durham Regional Police Service", description: "Regional police service for Durham Region, Ontario", type: "Regional Police", website: "https://www.drps.ca/" },
    { name: "Halton Regional Police Service", description: "Regional police service for Halton Region, Ontario", type: "Regional Police", website: "https://www.haltonpolice.ca/" },
    { name: "Waterloo Regional Police Service", description: "Regional police service for Waterloo Region, Ontario", type: "Regional Police", website: "https://www.wrps.on.ca/" },
    { name: "Niagara Regional Police Service", description: "Regional police service for Niagara Region, Ontario", type: "Regional Police", website: "https://www.nrps.com/" },
    { name: "Service de police de la Ville de Montréal (SPVM)", description: "Municipal police service for the City of Montreal", type: "Municipal Police", website: "https://spvm.qc.ca/" }
  ],
  "Transit & Transportation Police": [
    { name: "Toronto Transit Commission Special Constables", description: "Transit enforcement and security for TTC system", type: "Transit Police", website: "https://www.ttc.ca/riding-the-ttc/safety-and-security" },
    { name: "TransLink Transit Police", description: "Police service for Metro Vancouver transit system", type: "Transit Police", website: "https://transitpolice.ca/" },
    { name: "GO Transit Special Constables", description: "Transit security for GO Transit system in Greater Toronto Area", type: "Transit Police", website: "https://www.gotransit.com/en/travelling-with-us/safety-and-security" },
    { name: "VIA Rail Police Service", description: "Railway police for VIA Rail passenger services", type: "Railway Police", website: "https://www.viarail.ca/en/help-and-contact/safety-and-security" },
    { name: "Canadian Pacific Railway Police", description: "Railway police for Canadian Pacific Railway operations", type: "Railway Police", website: "https://www.cpr.ca/en/safety" }
  ],
  "Indigenous Police Services": [
    { name: "Akwesasne Mohawk Police Service", description: "First Nations police service for Akwesasne territory", type: "First Nations Police", website: "https://www.ampolice.org/" },
    { name: "Anishinabek Police Service", description: "First Nations police service for multiple Ontario communities", type: "First Nations Police", website: "https://www.anishinabekpolice.ca/" },
    { name: "Treaty Three Police Service", description: "First Nations police service for Treaty 3 territory in Ontario", type: "First Nations Police", website: "https://treaty3police.ca/" },
    { name: "Nishnawbe-Aski Police Service", description: "First Nations police service for remote northern Ontario communities", type: "First Nations Police", website: "https://naps.ca/" },
    { name: "Dakota Ojibway Police Service", description: "First Nations police service for Manitoba communities", type: "First Nations Police", website: "https://dops.ca/" },
    { name: "File Hills First Nations Police Service", description: "First Nations police service for Saskatchewan communities", type: "First Nations Police", website: "https://www.fhfnpolice.ca/" },
    { name: "Blood Tribe Police Service", description: "First Nations police service for Blood Tribe in Alberta", type: "First Nations Police", website: "https://bloodtribe.org/departments/police/" },
    { name: "Stl'atl'imx Tribal Police Service", description: "First Nations police service for British Columbia communities", type: "First Nations Police", website: "https://stlatlimxtribalpolice.com/" }
  ],
  "Conservation & Wildlife Enforcement": [
    { name: "Ontario Ministry of Natural Resources Conservation Officers", description: "Natural resources and wildlife law enforcement in Ontario", type: "Conservation", website: "https://www.ontario.ca/page/natural-resources-enforcement" },
    { name: "British Columbia Conservation Officer Service", description: "Wildlife and environmental law enforcement in BC", type: "Conservation", website: "https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/conservation-officer-service" },
    { name: "Alberta Fish and Wildlife Enforcement", description: "Fish and wildlife law enforcement in Alberta", type: "Conservation", website: "https://www.alberta.ca/fish-and-wildlife-enforcement.aspx" },
    { name: "Saskatchewan Ministry of Environment Conservation Officers", description: "Environmental and wildlife enforcement in Saskatchewan", type: "Conservation", website: "https://www.saskatchewan.ca/residents/environment/conservation-officers" },
    { name: "Manitoba Conservation and Climate Officers", description: "Natural resources and environmental enforcement in Manitoba", type: "Conservation", website: "https://www.gov.mb.ca/sd/wildlife/enforcement/" },
    { name: "Nova Scotia Department of Natural Resources Enforcement", description: "Natural resources enforcement in Nova Scotia", type: "Conservation", website: "https://novascotia.ca/natr/enforcement/" }
  ],
  "Sheriff & Court Services": [
    { name: "Ontario Court Services", description: "Court security and prisoner transport in Ontario", type: "Court Services", website: "https://www.ontario.ca/page/court-services" },
    { name: "British Columbia Sheriff Service", description: "Court security, prisoner transport, and civil enforcement in BC", type: "Sheriff Service", website: "https://www2.gov.bc.ca/gov/content/justice/criminal-justice/bc-sheriff-service" },
    { name: "Alberta Sheriff Services", description: "Court security and civil enforcement in Alberta", type: "Sheriff Service", website: "https://www.alberta.ca/alberta-sheriffs.aspx" },
    { name: "Saskatchewan Sheriff Services", description: "Court security and enforcement services in Saskatchewan", type: "Sheriff Service", website: "https://www.saskatchewan.ca/residents/justice-crime-and-the-law/sheriff-services" },
    { name: "Manitoba Sheriff Services", description: "Court security and civil enforcement in Manitoba", type: "Sheriff Service", website: "https://www.gov.mb.ca/justice/sheriff/" },
    { name: "Nova Scotia Sheriff Services", description: "Court security and civil enforcement in Nova Scotia", type: "Sheriff Service", website: "https://novascotia.ca/just/sheriff_services/" }
  ],
  "Emergency Management": [
    { name: "Public Safety Canada", description: "National emergency preparedness and public safety coordination", type: "Emergency Management", website: "https://www.publicsafety.gc.ca/" },
    { name: "Emergency Management Ontario", description: "Provincial emergency management and coordination", type: "Emergency Management", website: "https://www.ontario.ca/page/emergency-management-ontario" },
    { name: "Emergency Management BC", description: "Provincial emergency management for British Columbia", type: "Emergency Management", website: "https://www2.gov.bc.ca/gov/content/safety/emergency-management" },
    { name: "Alberta Emergency Management Agency", description: "Provincial emergency management for Alberta", type: "Emergency Management", website: "https://www.alberta.ca/alberta-emergency-management-agency.aspx" }
  ]
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favoriteSchools, setFavoriteSchools] = useState<string[]>([]);
  const [favoriteLinks, setFavoriteLinks] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [expandedContinents, setExpandedContinents] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedEducationCategories, setExpandedEducationCategories] = useState<string[]>([]);
  const [expandedPoliceCategories, setExpandedPoliceCategories] = useState<string[]>([]);
  const [expandedTransportCategories, setExpandedTransportCategories] = useState<string[]>([]);
  const [isOfficialDirectoriesExpanded, setIsOfficialDirectoriesExpanded] = useState<boolean>(false);
  const [expandedNonprofitCategories, setExpandedNonprofitCategories] = useState<string[]>([]);


  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedSchools = localStorage.getItem('canadaAccessHub_favoriteSchools');
    if (savedSchools) {
      setFavoriteSchools(JSON.parse(savedSchools));
    }
    
    const savedLinks = localStorage.getItem('canadaAccessHub_favoriteLinks');
    if (savedLinks) {
      setFavoriteLinks(JSON.parse(savedLinks));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('canadaAccessHub_favoriteSchools', JSON.stringify(favoriteSchools));
  }, [favoriteSchools]);

  useEffect(() => {
    localStorage.setItem('canadaAccessHub_favoriteLinks', JSON.stringify(favoriteLinks));
  }, [favoriteLinks]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };



  const handleToggleSchoolFavorite = (url: string) => {
    setFavoriteSchools(prev => 
      prev.includes(url) 
        ? prev.filter(fav => fav !== url)
        : [...prev, url]
    );
  };

  const handleToggleFavorite = (linkUrl: string) => {
    setFavoriteLinks(prev => 
      prev.includes(linkUrl) 
        ? prev.filter(fav => fav !== linkUrl)
        : [...prev, linkUrl]
    );
  };

  const handleTabChange = (value: string) => {
    if (activeTab === value) {
      setActiveTab(""); // Close the tab if it's already active
    } else {
      setActiveTab(value); // Open the new tab
    }
  };





  const getAllEmbassies = () => {
    return Object.entries(canadianEmbassiesData).map(([continent, countries]) => ({
      continent,
      countries
    }));
  };

  const toggleContinent = (continent: string) => {
    setExpandedContinents(prev => 
      prev.includes(continent) 
        ? [] // Close the current continent
        : [continent] // Open only this continent, close all others
    );
  };

  const isExpanded = (continent: string) => {
    return expandedContinents.includes(continent);
  };

  const isContinentExpanded = (continent: string) => {
    return expandedContinents.includes(continent);
  };

  const isCategoryExpanded = (category: string) => {
    return expandedCategories.includes(category);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? [] // Close the current category
        : [category] // Open only this category, close all others
    );
  };

  const toggleEducationCategory = (category: string) => {
    setExpandedEducationCategories(prev => 
      prev.includes(category) 
        ? [] // Close the current category
        : [category] // Open only this category, close all others
    );
  };

  const isPoliceCategoryExpanded = (category: string) => {
    return expandedPoliceCategories.includes(category);
  };

  const togglePoliceCategory = (category: string) => {
    setExpandedPoliceCategories(prev => 
      prev.includes(category) 
        ? [] // Close the current category
        : [category] // Open only this category, close all others
    );
  };

  const isEducationCategoryExpanded = (category: string) => {
    return expandedEducationCategories.includes(category);
  };

  const isTransportCategoryExpanded = (category: string) => {
    return expandedTransportCategories.includes(category);
  };

  const toggleTransportCategory = (category: string) => {
    setExpandedTransportCategories(prev => 
      prev.includes(category) 
        ? [] // Close the current category
        : [category] // Open only this category, close all others
    );
  };

  const isNonprofitCategoryExpanded = (category: string) => {
    return expandedNonprofitCategories.includes(category);
  };

  const toggleNonprofitCategory = (category: string) => {
    setExpandedNonprofitCategories(prev => 
      prev.includes(category) 
        ? [] // Close the current category
        : [category] // Open only this category, close all others
    );
  };

  // Initialize expanded continents on mount (start collapsed)
  useEffect(() => {
    setExpandedContinents([]);
  }, []);

  const categoryGradients = {
    "Taxes & Benefits": { from: "from-green-600", to: "to-green-700", icon: "fas fa-calculator", emoji: "💰" },
    "Pensions & Retirement": { from: "from-purple-600", to: "to-purple-700", icon: "fas fa-piggy-bank", emoji: "🏦" },
    "Employment & Social Development": { from: "from-blue-600", to: "to-blue-700", icon: "fas fa-briefcase", emoji: "💼" },
    "Immigration & Citizenship": { from: "from-indigo-600", to: "to-indigo-700", icon: "fas fa-passport", emoji: "🛂" },
    "Health & Disability": { from: "from-red-600", to: "to-red-700", icon: "fas fa-heartbeat", emoji: "🏥" },
    "Legal / Identification": { from: "from-yellow-600", to: "to-yellow-700", icon: "fas fa-gavel", emoji: "⚖️" },
    "Banking & Financial Services": { from: "from-emerald-600", to: "to-emerald-700", icon: "fas fa-university", emoji: "🏛️" },
    "Non-Profits": { from: "from-pink-600", to: "to-pink-700", icon: "fas fa-heart", emoji: "🤝" },
    "General Government": { from: "from-gray-600", to: "to-gray-700", icon: "fas fa-landmark", emoji: "🏛️" },
    "Police & Security Forces": { from: "from-blue-600", to: "to-blue-700", icon: "fas fa-shield-alt", emoji: "🚔" },
    "Education": { from: "from-green-600", to: "to-green-700", icon: "fas fa-graduation-cap", emoji: "🎓" },
    "Embassies": { from: "from-red-600", to: "to-red-700", icon: "fas fa-flag", emoji: "🏛️" },
    "Major Transportation": { from: "from-orange-600", to: "to-orange-700", icon: "fas fa-plane", emoji: "🚗" },

  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Window Controls Overlay for PWA */}
      <div className="window-controls-overlay">
        <div className="flex items-center space-x-2 px-4">
          <i className="fas fa-maple-leaf text-red-400 text-lg"></i>
          <h1 className="text-lg font-bold text-foreground">Canada Access Hub</h1>
        </div>
      </div>
      
      {/* Fixed Header */}
      <header className="header-gradient text-white shadow-xl fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <i className="fas fa-maple-leaf text-red-400 text-lg sm:text-xl lg:text-2xl drop-shadow-sm"></i>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">Canada Access Hub</h1>
                <p className="text-blue-50 mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base">All your government links in one place.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-sm">🇨🇦</span>
                <span className="text-sm font-medium">Official Government Portal</span>
              </div>
              <ShareButton />
            </div>
          </div>
        </div>
      </header>

      {/* Header Spacer */}
      <div className="h-20 sm:h-24 lg:h-32"></div>

      {/* Search Section */}
      <SearchBar onSearch={handleSearch} />

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto px-4 py-6">
        {/* Top Navigation Buttons */}
        <div className="overflow-x-auto mb-8 scrollbar-hide">
          <div className="flex space-x-3 min-w-max px-1 py-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-opacity-90 active:scale-95 min-w-max ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-home text-sm"></i>
              <span className="text-sm font-medium">Home</span>
            </button>






            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-opacity-90 active:scale-95 min-w-max ${
                activeTab === 'contact' 
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <i className="fas fa-envelope text-sm"></i>
              <span className="text-sm font-medium">Contact</span>
            </button>
          </div>
        </div>

        {/* Main Category Grid */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(linksData).map(([category, links]) => {
              const gradient = categoryGradients[category as keyof typeof categoryGradients] || { 
                from: "from-gray-600", 
                to: "to-gray-700", 
                icon: "fas fa-cog",
                emoji: "⚙️"
              };
              
              const filteredLinks = links.filter(link => 
                searchTerm === "" || 
                link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                link.description.toLowerCase().includes(searchTerm.toLowerCase())
              );
              
              return (
                <div
                  key={category}
                  className={`rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300 ${
                    category === "Taxes & Benefits" || category === "Pensions & Retirement" ? "m-2.5" : ""
                  } ${isCategoryExpanded(category) ? "row-span-2" : ""}`}
                >
                  <button
                    className={`p-3 sm:p-4 md:p-6 bg-gradient-to-r ${gradient.from} ${gradient.to} text-white hover:scale-[1.02] active:scale-95 transition-transform duration-200 text-left w-full`}
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl">{gradient.emoji || "📋"}</div>
                      <div className="flex items-center space-x-2">
                        <i className={`${gradient.icon} text-lg opacity-75`}></i>
                        <i className={`fas fa-chevron-${isCategoryExpanded(category) ? 'up' : 'down'} text-sm opacity-75 transition-transform`}></i>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category}</h3>
                    <p className="text-sm opacity-90">
                      {category === "Police & Security Forces" ? "54" : 
                       category === "Education" ? "50+" :
                       category === "Embassies" ? "200+" :
                       category === "Major Transportation" ? "50+" :
                       filteredLinks.length} service{
                        (category === "Police & Security Forces" ? 54 : 
                         category === "Education" ? 50 :
                         category === "Embassies" ? 200 :
                         category === "Major Transportation" ? 50 :
                         filteredLinks.length) !== 1 ? 's' : ''
                      } available
                      {!isCategoryExpanded(category) && <span className="ml-2 font-medium">• Click to expand</span>}
                    </p>
                  </button>
                  
                  {isCategoryExpanded(category) && (
                    <div className="p-4 bg-white">
                      {category === "Major Transportation" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="text-sm text-orange-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Comprehensive directory of major transportation systems across Canada including airlines, rail, transit, ferries, and northern services.
                            </div>
                          </div>

                          {/* Transportation Categories - Accordion Style */}
                          <div className="space-y-4">
                            {[
                              {
                                name: "🇨🇦 National Systems",
                                icon: "fas fa-flag",
                                services: [
                                  { name: "Air Canada", description: "Canada's flag carrier airline", type: "Airlines", url: "https://www.aircanada.com/" },
                                  { name: "WestJet", description: "Canadian low-cost airline", type: "Airlines", url: "https://www.westjet.com/" },
                                  { name: "Porter Airlines", description: "Regional airline serving Eastern Canada", type: "Airlines", url: "https://www.flyporter.com/" },
                                  { name: "Flair Airlines", description: "Ultra low-cost airline", type: "Airlines", url: "https://flyflair.com/" },
                                  { name: "Lynx Air", description: "Canadian ultra low-cost carrier", type: "Airlines", url: "https://lynxair.com/" },
                                  { name: "Toronto Pearson (YYZ)", description: "Canada's busiest airport", type: "Airports", url: "https://www.torontopearson.com/" },
                                  { name: "Vancouver International (YVR)", description: "Major Pacific gateway", type: "Airports", url: "https://www.yvr.ca/" },
                                  { name: "Montreal-Trudeau (YUL)", description: "Quebec's main airport", type: "Airports", url: "https://www.admtl.com/" },
                                  { name: "Calgary International (YYC)", description: "Alberta's major airport", type: "Airports", url: "https://www.yyc.com/" },
                                  { name: "Edmonton International (YEG)", description: "Northern Alberta gateway", type: "Airports", url: "https://flyeia.com/" },
                                  { name: "Ottawa Macdonald-Cartier (YOW)", description: "National capital airport", type: "Airports", url: "https://yow.ca/" },
                                  { name: "Halifax Stanfield (YHZ)", description: "Atlantic Canada's major airport", type: "Airports", url: "https://hiaa.ca/" },
                                  { name: "VIA Rail", description: "National passenger rail service", type: "Rail", url: "https://www.viarail.ca/" },
                                  { name: "Rocky Mountaineer", description: "Luxury tourist train through Canadian Rockies", type: "Rail", url: "https://www.rockymountaineer.com/" },
                                  { name: "CN Rail", description: "Canadian National Railway freight", type: "Freight Rail", url: "https://www.cn.ca/" },
                                  { name: "CP Rail", description: "Canadian Pacific Railway freight", type: "Freight Rail", url: "https://www.cpr.ca/" },
                                  { name: "Rider Express", description: "Intercity bus service in Western Canada", type: "Buses", url: "https://riderexpress.ca/" },
                                  { name: "Ontario Northland", description: "Bus and train service in Northern Ontario", type: "Buses", url: "https://www.ontarionorthland.ca/" },
                                  { name: "Maritime Bus", description: "Regional bus service in Atlantic Canada", type: "Buses", url: "https://www.maritimebus.com/" }
                                ]
                              },
                              {
                                name: "🏙️ Urban Transit (By Province)",
                                icon: "fas fa-bus",
                                services: [
                                  { name: "TTC (Toronto Transit Commission)", description: "Toronto's public transit system", type: "Ontario", url: "https://www.ttc.ca/" },
                                  { name: "GO Transit", description: "Greater Toronto Area regional transit", type: "Ontario", url: "https://www.gotransit.com/" },
                                  { name: "MiWay", description: "Mississauga public transit", type: "Ontario", url: "https://www.mississauga.ca/miway/" },
                                  { name: "OC Transpo", description: "Ottawa public transit", type: "Ontario", url: "https://www.octranspo.com/" },
                                  { name: "STM (Société de transport de Montréal)", description: "Montreal public transit", type: "Quebec", url: "https://www.stm.info/" },
                                  { name: "Exo", description: "Greater Montreal regional transit", type: "Quebec", url: "https://exo.quebec/" },
                                  { name: "STL (Société de transport de Laval)", description: "Laval public transit", type: "Quebec", url: "https://www.stl.laval.qc.ca/" },
                                  { name: "RTL (Réseau de transport de Longueuil)", description: "Longueuil public transit", type: "Quebec", url: "https://www.rtl-longueuil.qc.ca/" },
                                  { name: "RTC (Réseau de transport de la Capitale)", description: "Quebec City public transit", type: "Quebec", url: "https://www.rtcquebec.ca/" },
                                  { name: "TransLink", description: "Vancouver regional transit authority", type: "BC", url: "https://www.translink.ca/" },
                                  { name: "BC Transit", description: "Public transit across British Columbia", type: "BC", url: "https://www.bctransit.com/" },
                                  { name: "ETS (Edmonton Transit Service)", description: "Edmonton public transit", type: "Alberta", url: "https://www.edmonton.ca/ets/" },
                                  { name: "Calgary Transit", description: "Calgary public transit system", type: "Alberta", url: "https://www.calgarytransit.com/" },
                                  { name: "Winnipeg Transit", description: "Winnipeg public transit", type: "Others", url: "https://winnipegtransit.com/" },
                                  { name: "Halifax Transit", description: "Halifax regional transit", type: "Others", url: "https://www.halifax.ca/transportation/halifax-transit/" },
                                  { name: "Metrobus NL", description: "St. John's public transit", type: "Others", url: "https://www.metrobus.com/" }
                                ]
                              },
                              {
                                name: "⛴️ Ferries",
                                icon: "fas fa-ship",
                                services: [
                                  { name: "BC Ferries", description: "Ferry services connecting coastal British Columbia", type: "West Coast", url: "https://www.bcferries.com/" },
                                  { name: "Marine Atlantic", description: "Ferry service between Nova Scotia and Newfoundland", type: "NS ↔ NL", url: "https://www.marineatlantic.ca/" },
                                  { name: "Northumberland Ferries", description: "Ferry connecting Prince Edward Island and New Brunswick", type: "PEI ↔ NB", url: "https://www.ferries.ca/" },
                                  { name: "Ontario Ferries", description: "Ferry services within Ontario waters", type: "Ontario & Quebec", url: "https://www.ontario.ca/page/ferry-services" },
                                  { name: "Quebec Ferries", description: "Ferry services within Quebec waters", type: "Ontario & Quebec", url: "https://www.transports.gouv.qc.ca/fr/entreprises-partenaires/maritime/Pages/traversiers.aspx" }
                                ]
                              },
                              {
                                name: "❄️ Northern Transportation",
                                icon: "fas fa-snowflake",
                                services: [
                                  { name: "Air North", description: "Regional airline serving Yukon Territory", type: "Yukon", url: "https://www.flyairnorth.com/" },
                                  { name: "Canadian North", description: "Northern airline serving Arctic communities", type: "Arctic", url: "https://www.canadiannorth.com/" },
                                  { name: "Northwest Territories Highways", description: "Road network in NWT", type: "Roads & Shuttles", url: "https://www.gov.nt.ca/en/services/highways" },
                                  { name: "Nunavut Transportation", description: "Air and seasonal road access in Nunavut", type: "Arctic Services", url: "https://www.gov.nu.ca/community-and-government-services/information/transportation" },
                                  { name: "Territorial Shuttles", description: "Regional shuttle services in northern territories", type: "Shuttle Services", url: "https://www.gov.nt.ca/en/services/transportation" }
                                ]
                              }
                            ].map((transportCategory) => {
                              const filteredServices = transportCategory.services.filter(service => {
                                const matchesSearch = searchTerm === "" || 
                                  service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  service.type.toLowerCase().includes(searchTerm.toLowerCase());
                                return matchesSearch;
                              });

                              if (filteredServices.length === 0) return null;

                              return (
                                <div key={transportCategory.name} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                                  <button
                                    className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                      isTransportCategoryExpanded(transportCategory.name) 
                                        ? 'bg-gradient-to-r from-orange-700 to-orange-800' 
                                        : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
                                    }`}
                                    onClick={() => toggleTransportCategory(transportCategory.name)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <i className={`${transportCategory.icon} text-2xl`}></i>
                                        <div>
                                          <h3 className="text-xl font-bold">{transportCategory.name}</h3>
                                          <p className="text-sm opacity-90">
                                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                                            </span>
                                            {!isTransportCategoryExpanded(transportCategory.name) && <span className="font-medium animate-pulse">👆 Click to expand and view services</span>}
                                            {isTransportCategoryExpanded(transportCategory.name) && <span className="font-medium">👆 Click to collapse</span>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs opacity-75">
                                          {isTransportCategoryExpanded(transportCategory.name) ? 'Expanded' : 'Collapsed'}
                                        </span>
                                        <i className={`fas fa-chevron-${isTransportCategoryExpanded(transportCategory.name) ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                      </div>
                                    </div>
                                  </button>
                                  
                                  {isTransportCategoryExpanded(transportCategory.name) && (
                                    <div className="p-6 bg-white">
                                      <div className="space-y-4">
                                        {filteredServices.map((service, index) => (
                                          <div key={index} className="border-l-4 border-orange-600 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                {service.url ? (
                                                  <a 
                                                    href={service.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-orange-600 mb-1 hover:text-orange-700 hover:underline transition-colors inline-flex items-center"
                                                  >
                                                    {service.name}
                                                    <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                                  </a>
                                                ) : (
                                                  <h4 className="font-semibold text-orange-600 mb-1">
                                                    {service.name}
                                                  </h4>
                                                )}
                                                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                                                <div className="flex items-center space-x-2">
                                                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                                                    {service.type}
                                                  </span>
                                                  {service.url && (
                                                    <span className="text-xs text-gray-500">
                                                      <i className="fas fa-link mr-1"></i>
                                                      Visit website
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : category === "Police & Security Forces" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm text-blue-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              54 law enforcement and security agencies across Canada. For emergencies, dial 
                              <span className="font-bold text-red-600 ml-1 mr-1">911</span>
                              or contact your local police service.
                            </div>
                          </div>

                          {/* Summary Counter */}
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <div className="text-center">
                              <h4 className="text-lg font-bold text-blue-800 mb-3">
                                📊 Complete Service Breakdown - 54 Total Services
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Federal</div>
                                  <div className="text-blue-600">8 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Provincial</div>
                                  <div className="text-blue-600">3 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Municipal</div>
                                  <div className="text-blue-600">14 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Transit</div>
                                  <div className="text-blue-600">5 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Indigenous</div>
                                  <div className="text-blue-600">8 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Conservation</div>
                                  <div className="text-blue-600">6 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Sheriff</div>
                                  <div className="text-blue-600">6 services</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="font-bold text-blue-800">Emergency</div>
                                  <div className="text-blue-600">4 services</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center space-x-2 mb-2">
                              <i className="fas fa-list text-blue-600"></i>
                              <h4 className="font-bold text-blue-800">How to View All 54 Services:</h4>
                            </div>
                            <p className="text-blue-700 text-sm">
                              Each category below contains multiple police and security services. 
                              <strong> Click on any category header to expand and see all services within that category.</strong>
                            </p>
                          </div>

                          {/* Police & Security Categories - Accordion Style */}
                          <div className="space-y-4">
                            {Object.entries(canadianPoliceSecurityData).map(([policeCategory, services]) => {
                              const filteredServices = services.filter(service => {
                                const matchesSearch = searchTerm === "" || 
                                  service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  service.type.toLowerCase().includes(searchTerm.toLowerCase());
                                return matchesSearch;
                              });

                              if (filteredServices.length === 0) return null;

                              return (
                                <div key={policeCategory} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                                  <button
                                    className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                      isPoliceCategoryExpanded(policeCategory) 
                                        ? 'bg-gradient-to-r from-blue-700 to-blue-800' 
                                        : 'bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800'
                                    }`}
                                    onClick={() => togglePoliceCategory(policeCategory)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <i className={`fas ${
                                          policeCategory === "Federal Agencies" ? "fa-shield-alt" : 
                                          policeCategory === "Provincial Police" ? "fa-car-crash" :
                                          policeCategory === "Major Municipal Police" ? "fa-city" :
                                          policeCategory === "Transit & Transportation Police" ? "fa-bus" :
                                          policeCategory === "Indigenous Police Services" ? "fa-feather-alt" :
                                          policeCategory === "Conservation & Wildlife Enforcement" ? "fa-leaf" :
                                          policeCategory === "Sheriff & Court Services" ? "fa-gavel" :
                                          policeCategory === "Emergency Management" ? "fa-exclamation-triangle" :
                                          "fa-shield"
                                        } text-2xl`}></i>
                                        <div>
                                          <h3 className="text-xl font-bold">{policeCategory}</h3>
                                          <p className="text-sm opacity-90">
                                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                                            </span>
                                            {!isPoliceCategoryExpanded(policeCategory) && <span className="font-medium animate-pulse">👆 Click to expand and view all services</span>}
                                            {isPoliceCategoryExpanded(policeCategory) && <span className="font-medium">👆 Click to collapse</span>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs opacity-75">
                                          {isPoliceCategoryExpanded(policeCategory) ? 'Expanded' : 'Collapsed'}
                                        </span>
                                        <i className={`fas fa-chevron-${isPoliceCategoryExpanded(policeCategory) ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                      </div>
                                    </div>
                                  </button>
                                  
                                  {isPoliceCategoryExpanded(policeCategory) && (
                                    <div className="p-6 bg-white">
                                      <div className="space-y-4">
                                        {filteredServices.map((service, index) => (
                                          <div key={index} className="border-l-4 border-blue-800 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                  <a 
                                                    href={service.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                                  >
                                                    {service.name}
                                                    <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                                  </a>
                                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {service.type}
                                                  </span>
                                                </div>
                                                <p className="text-gray-600 text-sm">{service.description}</p>
                                              </div>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const favorites = [...favoriteLinks];
                                                  const index = favorites.indexOf(service.website);
                                                  if (index > -1) {
                                                    favorites.splice(index, 1);
                                                  } else {
                                                    favorites.push(service.website);
                                                  }
                                                  setFavoriteLinks(favorites);
                                                  localStorage.setItem('favoriteLinks', JSON.stringify(favorites));
                                                }}
                                                className={`ml-2 p-2 rounded-full transition-colors ${
                                                  favoriteLinks.includes(service.website) 
                                                    ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                                                    : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                                                }`}
                                              >
                                                <i className="fas fa-star text-sm"></i>
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Emergency Contact Section */}
                          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                            <div className="flex items-center mb-4">
                              <div className="bg-red-200 p-2 rounded-full mr-3">
                                <i className="fas fa-phone text-red-700"></i>
                              </div>
                              <div>
                                <h4 className="font-bold text-red-800">Emergency Numbers</h4>
                                <p className="text-red-700 text-sm">Important emergency and non-emergency contacts</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <a href="tel:911" className="flex items-center p-3 bg-white rounded-lg hover:bg-red-50 transition-colors border border-red-200">
                                <div className="bg-red-100 p-2 rounded-full mr-3">
                                  <i className="fas fa-exclamation-triangle text-red-700"></i>
                                </div>
                                <div>
                                  <p className="text-red-800 font-bold text-lg">911</p>
                                  <p className="text-red-600 text-xs">Emergency Services</p>
                                </div>
                              </a>
                              <a href="tel:311" className="flex items-center p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <i className="fas fa-info-circle text-blue-700"></i>
                                </div>
                                <div>
                                  <p className="text-blue-800 font-bold text-lg">311</p>
                                  <p className="text-blue-600 text-xs">Municipal Services</p>
                                </div>
                              </a>
                              <a href="tel:1-800-222-8477" className="flex items-center p-3 bg-white rounded-lg hover:bg-green-50 transition-colors border border-green-200">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  <i className="fas fa-comments text-green-700"></i>
                                </div>
                                <div>
                                  <p className="text-green-800 font-bold text-sm">1-800-222-8477</p>
                                  <p className="text-green-600 text-xs">Crime Stoppers</p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : category === "Education" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-sm text-green-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Comprehensive directory of Canadian educational institutions and resources
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center space-x-2 mb-2">
                              <i className="fas fa-graduation-cap text-green-600"></i>
                              <h4 className="font-bold text-green-800">Browse Educational Institutions:</h4>
                            </div>
                            <p className="text-green-700 text-sm">
                              Click on any category below to view educational institutions and resources.
                            </p>
                          </div>

                          {/* Education Categories - Accordion Style */}
                          <div className="space-y-4">
                            {Object.entries(canadianEducationData).map(([eduCategory, institutions]) => {
                              const filteredInstitutions = institutions.filter(institution => {
                                const matchesSearch = searchTerm === "" || 
                                  institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  institution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  institution.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  institution.type.toLowerCase().includes(searchTerm.toLowerCase());
                                return matchesSearch;
                              });

                              if (filteredInstitutions.length === 0) return null;

                              return (
                                <div key={eduCategory} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                                  <button
                                    className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                      isEducationCategoryExpanded(eduCategory) 
                                        ? 'bg-gradient-to-r from-green-700 to-green-800' 
                                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                                    }`}
                                    onClick={() => toggleEducationCategory(eduCategory)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <i className={`fas ${
                                          eduCategory === "Universities" ? "fa-university" : 
                                          eduCategory === "Colleges" ? "fa-school" :
                                          eduCategory === "Institutes" ? "fa-building" :
                                          eduCategory === "Resources" ? "fa-book" :
                                          "fa-graduation-cap"
                                        } text-2xl`}></i>
                                        <div>
                                          <h3 className="text-xl font-bold">{eduCategory}</h3>
                                          <p className="text-sm opacity-90">
                                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                              {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''}
                                            </span>
                                            {!isEducationCategoryExpanded(eduCategory) && <span className="font-medium animate-pulse">👆 Click to expand and view all institutions</span>}
                                            {isEducationCategoryExpanded(eduCategory) && <span className="font-medium">👆 Click to collapse</span>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs opacity-75">
                                          {isEducationCategoryExpanded(eduCategory) ? 'Expanded' : 'Collapsed'}
                                        </span>
                                        <i className={`fas fa-chevron-${isEducationCategoryExpanded(eduCategory) ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                      </div>
                                    </div>
                                  </button>
                                  
                                  {isEducationCategoryExpanded(eduCategory) && (
                                    <div className="p-6 bg-white">
                                      <div className="space-y-4">
                                        {filteredInstitutions.map((institution, index) => (
                                          <div key={index} className="border-l-4 border-green-800 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                  <a 
                                                    href={institution.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-semibold text-green-600 hover:text-green-800 transition-colors"
                                                  >
                                                    {institution.name}
                                                    <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                                  </a>
                                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                    {institution.province}
                                                  </span>
                                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {institution.type}
                                                  </span>
                                                </div>
                                                <p className="text-gray-600 text-sm">{institution.description}</p>
                                              </div>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const favorites = [...favoriteSchools];
                                                  const index = favorites.indexOf(institution.url);
                                                  if (index > -1) {
                                                    favorites.splice(index, 1);
                                                  } else {
                                                    favorites.push(institution.url);
                                                  }
                                                  setFavoriteSchools(favorites);
                                                  localStorage.setItem('favoriteSchools', JSON.stringify(favorites));
                                                }}
                                                className={`ml-2 p-2 rounded-full transition-colors ${
                                                  favoriteSchools.includes(institution.url) 
                                                    ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                                                    : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                                                }`}
                                              >
                                                <i className="fas fa-star text-sm"></i>
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : category === "Embassies" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-red-50 p-4 rounded-lg">
                            <div className="text-sm text-red-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Complete directory of Canadian embassies and diplomatic missions worldwide - 200+ missions across all continents
                            </div>
                          </div>

                          {/* Summary Counter */}
                          <div className="bg-white p-4 rounded-lg border border-red-200">
                            <div className="text-center">
                              <h4 className="text-lg font-bold text-red-800 mb-3">
                                🌍 Global Canadian Diplomatic Presence - 200+ Total Missions
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="font-bold text-red-800">North America</div>
                                  <div className="text-red-600">20+ missions</div>
                                </div>
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="font-bold text-red-800">Europe</div>
                                  <div className="text-red-600">80+ missions</div>
                                </div>
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="font-bold text-red-800">Asia</div>
                                  <div className="text-red-600">60+ missions</div>
                                </div>
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="font-bold text-red-800">Africa</div>
                                  <div className="text-red-600">30+ missions</div>
                                </div>
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="font-bold text-red-800">Oceania</div>
                                  <div className="text-red-600">10+ missions</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Instructions */}
                          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                            <div className="flex items-center space-x-2 mb-2">
                              <i className="fas fa-flag text-red-600"></i>
                              <h4 className="font-bold text-red-800">Browse Embassies by Continent:</h4>
                            </div>
                            <p className="text-red-700 text-sm">
                              Click on any continent below to view embassies and diplomatic missions.
                            </p>
                          </div>

                          {/* Embassy Categories - Accordion Style */}
                          <div className="space-y-4">
                            {Object.entries(canadianEmbassiesData).map(([continent, countries]) => {
                              const filteredCountries = countries.filter(countryData => {
                                const matchesSearch = searchTerm === "" || 
                                  countryData.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  countryData.missions.some(mission => 
                                    mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    mission.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    mission.address.toLowerCase().includes(searchTerm.toLowerCase())
                                  );
                                return matchesSearch;
                              });

                              if (filteredCountries.length === 0) return null;

                              // Count total missions for this continent
                              const totalMissions = filteredCountries.reduce((acc, country) => acc + country.missions.length, 0);

                              return (
                                <div key={continent} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                                  <button
                                    className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                      isContinentExpanded(continent) 
                                        ? 'bg-gradient-to-r from-red-700 to-red-800' 
                                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                                    }`}
                                    onClick={() => toggleContinent(continent)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <i className={`fas ${
                                          continent === "Europe" ? "fa-landmark" : 
                                          continent === "Asia" ? "fa-yin-yang" :
                                          continent === "North America" ? "fa-globe-americas" :
                                          continent === "Africa" ? "fa-sun" :
                                          continent === "Oceania" ? "fa-island-tropical" :
                                          "fa-flag"
                                        } text-2xl`}></i>
                                        <div>
                                          <h3 className="text-xl font-bold">{continent}</h3>
                                          <p className="text-sm opacity-90">
                                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                              {totalMissions} mission{totalMissions !== 1 ? 's' : ''} in {filteredCountries.length} countr{filteredCountries.length !== 1 ? 'ies' : 'y'}
                                            </span>
                                            {!isContinentExpanded(continent) && <span className="font-medium animate-pulse">👆 Click to expand and view all embassies</span>}
                                            {isContinentExpanded(continent) && <span className="font-medium">👆 Click to collapse</span>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs opacity-75">
                                          {isContinentExpanded(continent) ? 'Expanded' : 'Collapsed'}
                                        </span>
                                        <i className={`fas fa-chevron-${isContinentExpanded(continent) ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                      </div>
                                    </div>
                                  </button>
                                  
                                  {isContinentExpanded(continent) && (
                                    <div className="p-6 bg-white">
                                      <div className="space-y-6">
                                        {filteredCountries.map((countryData, countryIndex) => (
                                          <div key={countryIndex} className="border-l-4 border-red-600 pl-4 py-4 bg-red-50 rounded-lg">
                                            <h4 className="font-bold text-red-700 text-lg mb-3 flex items-center">
                                              <i className="fas fa-flag mr-2"></i>
                                              {countryData.country}
                                              <span className="ml-2 text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-normal">
                                                {countryData.missions.length} mission{countryData.missions.length !== 1 ? 's' : ''}
                                              </span>
                                            </h4>
                                            <div className="space-y-3">
                                              {countryData.missions.map((mission, missionIndex) => (
                                                <div key={missionIndex} className="bg-white p-4 rounded-lg border border-red-200 hover:border-red-300 transition-colors">
                                                  <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                      <div className="flex items-center space-x-3 mb-2">
                                                        <h5 className="font-semibold text-red-600">
                                                          {mission.name}
                                                        </h5>
                                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                          {mission.type}
                                                        </span>
                                                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                                          {mission.city}
                                                        </span>
                                                      </div>
                                                      <p className="text-gray-600 text-sm mb-2">
                                                        <i className="fas fa-map-marker-alt mr-1 text-red-500"></i>
                                                        {mission.address}
                                                      </p>
                                                      {mission.phone && (
                                                        <p className="text-gray-600 text-sm mb-2">
                                                          <i className="fas fa-phone mr-1 text-blue-500"></i>
                                                          <a href={`tel:${mission.phone}`} className="hover:text-blue-600 transition-colors">
                                                            {mission.phone}
                                                          </a>
                                                        </p>
                                                      )}
                                                      {mission.website && (
                                                        <a 
                                                          href={mission.website} 
                                                          target="_blank" 
                                                          rel="noopener noreferrer"
                                                          className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
                                                        >
                                                          <i className="fas fa-globe mr-1"></i>
                                                          Visit Embassy Website
                                                          <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                                        </a>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : category === "Non-Profits" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <div className="text-sm text-pink-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Complete directory of official government databases and Ontario non-profit organizations
                            </div>
                          </div>

                          {/* Official Directories Section - Accordion */}
                          <div className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                            <button
                              className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                isOfficialDirectoriesExpanded
                                  ? 'bg-gradient-to-r from-pink-700 to-pink-800' 
                                  : 'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800'
                              }`}
                              onClick={() => setIsOfficialDirectoriesExpanded(!isOfficialDirectoriesExpanded)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <i className="fas fa-database text-2xl"></i>
                                  <div>
                                    <h4 className="text-lg font-bold">🏛️ Official Government Directories</h4>
                                    <p className="text-sm opacity-90">
                                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                        {filteredLinks.length} official director{filteredLinks.length !== 1 ? 'ies' : 'y'}
                                      </span>
                                      {!isOfficialDirectoriesExpanded && <span className="font-medium animate-pulse">👆 Click to expand and view directories</span>}
                                      {isOfficialDirectoriesExpanded && <span className="font-medium">👆 Click to collapse</span>}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs opacity-75">
                                    {isOfficialDirectoriesExpanded ? 'Expanded' : 'Collapsed'}
                                  </span>
                                  <i className={`fas fa-chevron-${isOfficialDirectoriesExpanded ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                </div>
                              </div>
                            </button>
                            
                            {isOfficialDirectoriesExpanded && (
                              <div className="p-6 bg-white">
                                <div className="space-y-3">
                                  {filteredLinks.map((link, linkIndex) => (
                                    <div
                                      key={linkIndex}
                                      className="border-l-4 border-pink-600 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-pink-600 hover:text-pink-800 transition-colors"
                                          >
                                            {searchTerm && link.title.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                              <span dangerouslySetInnerHTML={{
                                                __html: link.title.replace(
                                                  new RegExp(searchTerm, 'gi'),
                                                  '<mark class="search-highlight">$&</mark>'
                                                )
                                              }} />
                                            ) : (
                                              link.title
                                            )}
                                            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                          </a>
                                          <p className="text-sm text-gray-600 mt-1">
                                            {searchTerm && link.description.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                              <span dangerouslySetInnerHTML={{
                                                __html: link.description.replace(
                                                  new RegExp(searchTerm, 'gi'),
                                                  '<mark class="search-highlight">$&</mark>'
                                                )
                                              }} />
                                            ) : (
                                              link.description
                                            )}
                                          </p>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleFavorite(link.url);
                                          }}
                                          className={`ml-3 p-2 rounded-full transition-colors ${
                                            favoriteLinks.includes(link.url) 
                                              ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                                              : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                                          }`}
                                        >
                                          <i className="fas fa-star text-sm"></i>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>



                          {/* Non-Profit Categories - Accordion Style */}
                          <div className="space-y-4">
                            {Object.entries(ontarioNonProfits).map(([nonprofitCategory, organizations]) => {
                              const filteredOrganizations = organizations.filter(org => {
                                const matchesSearch = searchTerm === "" || 
                                  org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  org.description.toLowerCase().includes(searchTerm.toLowerCase());
                                return matchesSearch;
                              });

                              if (filteredOrganizations.length === 0 && searchTerm !== "") return null;

                              return (
                                <div key={nonprofitCategory} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                                  <button
                                    className={`p-4 sm:p-6 text-white hover:scale-[1.02] active:scale-95 transition-all duration-200 text-left w-full ${
                                      isNonprofitCategoryExpanded(nonprofitCategory)
                                        ? 'bg-gradient-to-r from-pink-700 to-pink-800' 
                                        : 'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800'
                                    }`}
                                    onClick={() => toggleNonprofitCategory(nonprofitCategory)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <i className={`fas ${
                                          nonprofitCategory.includes("Health") ? "fa-heartbeat" : 
                                          nonprofitCategory.includes("Education") ? "fa-graduation-cap" :
                                          nonprofitCategory.includes("Immigration") ? "fa-globe" :
                                          nonprofitCategory.includes("Housing") ? "fa-home" :
                                          nonprofitCategory.includes("Legal") ? "fa-balance-scale" :
                                          nonprofitCategory.includes("Employment") ? "fa-briefcase" :
                                          nonprofitCategory.includes("Family") ? "fa-users" :
                                          nonprofitCategory.includes("Senior") ? "fa-user-clock" :
                                          nonprofitCategory.includes("Environmental") ? "fa-leaf" :
                                          "fa-heart"
                                        } text-2xl`}></i>
                                        <div>
                                          <h3 className="text-xl font-bold">{nonprofitCategory}</h3>
                                          <p className="text-sm opacity-90">
                                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full mr-2">
                                              {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''}
                                            </span>
                                            {!isNonprofitCategoryExpanded(nonprofitCategory) && <span className="font-medium animate-pulse">👆 Click to expand and view organizations</span>}
                                            {isNonprofitCategoryExpanded(nonprofitCategory) && <span className="font-medium">👆 Click to collapse</span>}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-xs opacity-75">
                                          {isNonprofitCategoryExpanded(nonprofitCategory) ? 'Expanded' : 'Collapsed'}
                                        </span>
                                        <i className={`fas fa-chevron-${isNonprofitCategoryExpanded(nonprofitCategory) ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                      </div>
                                    </div>
                                  </button>
                                  
                                  {isNonprofitCategoryExpanded(nonprofitCategory) && (
                                    <div className="p-6 bg-white">
                                      <div className="space-y-4">
                                        {filteredOrganizations.map((org, index) => (
                                          <div key={index} className="border-l-4 border-pink-600 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                <h4 className="font-semibold text-pink-600 mb-1">
                                                  {org.name}
                                                </h4>
                                                <p className="text-gray-600 text-sm mb-2">{org.description}</p>
                                                <a 
                                                  href={org.url} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="text-pink-600 hover:text-pink-800 transition-colors text-sm"
                                                >
                                                  <i className="fas fa-globe mr-1"></i>
                                                  Visit Website
                                                  <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredLinks.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex-1">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  {searchTerm && link.title.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                    <span dangerouslySetInnerHTML={{
                                      __html: link.title.replace(
                                        new RegExp(searchTerm, 'gi'),
                                        '<mark class="search-highlight">$&</mark>'
                                      )
                                    }} />
                                  ) : (
                                    link.title
                                  )}
                                  <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                </a>
                                <p className="text-sm text-gray-600 mt-1">
                                  {searchTerm && link.description.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                    <span dangerouslySetInnerHTML={{
                                      __html: link.description.replace(
                                        new RegExp(searchTerm, 'gi'),
                                        '<mark class="search-highlight">$&</mark>'
                                      )
                                    }} />
                                  ) : (
                                    link.description
                                  )}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleFavorite(link.url);
                                }}
                                className={`ml-3 p-2 rounded-full transition-colors ${
                                  favoriteLinks.includes(link.url) 
                                    ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                                    : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                                }`}
                              >
                                <i className="fas fa-star text-sm"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}





        {/* Old Education content removed - now part of Education category card */}
        {false && (
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Education Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">Colleges & Universities</h2>
                <p className="text-blue-100">Explore Canadian higher education institutions and application resources</p>
              </div>

              {/* Search and Filter Controls */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                    <select 
                      value={selectedProvince} 
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-12"
                    >
                      <option value="all">All Provinces</option>
                      <option value="Ontario">Ontario</option>
                      <option value="Quebec">Quebec</option>
                      <option value="British Columbia">British Columbia</option>
                      <option value="Alberta">Alberta</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="Saskatchewan">Saskatchewan</option>
                      <option value="Nova Scotia">Nova Scotia</option>
                      <option value="New Brunswick">New Brunswick</option>
                      <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                      <option value="Prince Edward Island">Prince Edward Island</option>
                      <option value="Northwest Territories">Northwest Territories</option>
                      <option value="Nunavut">Nunavut</option>
                      <option value="Yukon">Yukon</option>
                      <option value="National">National</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type</label>
                    <select 
                      value={selectedType} 
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-12"
                    >
                      <option value="all">All Types</option>
                      <option value="University">Universities</option>
                      <option value="Polytechnic">Polytechnics</option>
                      <option value="College">Colleges</option>
                      <option value="CEGEP">CEGEPs</option>
                      <option value="Resource">Resources</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-12"
                    >
                      <option value="all">All Categories</option>
                      {Object.keys(canadianEducationData).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Education Categories - Accordion Style */}
              <div className="space-y-4">
                {Object.entries(canadianEducationData).map(([category, institutions]) => {
                  if (selectedCategory !== "all" && selectedCategory !== category) return null;
                  
                  const filteredInstitutions = institutions.filter(inst => {
                    const matchesProvince = selectedProvince === "all" || inst.province === selectedProvince;
                    const matchesType = selectedType === "all" || inst.type === selectedType;
                    const matchesSearch = searchTerm === "" || 
                      inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      inst.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      inst.province.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesProvince && matchesType && matchesSearch;
                  });

                  if (filteredInstitutions.length === 0) return null;

                  return (
                    <div key={category} className="rounded-xl shadow-lg bg-white border border-gray-200 overflow-hidden transition-all duration-300">
                      <button
                        className="p-4 sm:p-6 bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-[1.02] active:scale-95 transition-transform duration-200 text-left w-full"
                        onClick={() => toggleEducationCategory(category)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <i className={`fas ${category === "Top Universities" ? "fa-university" : 
                              category === "Major Polytechnics" ? "fa-cogs" :
                              category === "Quebec CEGEPs" ? "fa-graduation-cap" :
                              category === "Community Colleges" ? "fa-school" :
                              "fa-info-circle"} text-2xl`}></i>
                            <div>
                              <h3 className="text-xl font-bold">{category}</h3>
                              <p className="text-sm opacity-90">
                                {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''} available
                                {!isEducationCategoryExpanded(category) && <span className="ml-2 font-medium">• Click to expand</span>}
                              </p>
                            </div>
                          </div>
                          <i className={`fas fa-chevron-${isEducationCategoryExpanded(category) ? 'up' : 'down'} text-sm opacity-75 transition-transform`}></i>
                        </div>
                      </button>
                      
                      {isEducationCategoryExpanded(category) && (
                        <div className="p-6 bg-white">
                          <div className="space-y-4">
                            {filteredInstitutions.map((institution, index) => (
                              <div key={index} className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <a 
                                        href={institution.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                      >
                                        {institution.name}
                                        <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                      </a>
                                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                        {institution.type}
                                      </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-1">{institution.description}</p>
                                    <p className="text-gray-500 text-xs">
                                      📍 {institution.province}
                                    </p>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleSchoolFavorite(institution.url);
                                    }}
                                    className={`ml-2 p-2 rounded-full transition-colors ${
                                      favoriteSchools.includes(institution.url) 
                                        ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                                        : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100'
                                    }`}
                                  >
                                    <i className="fas fa-star text-sm"></i>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Key Resources Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                  Key Resources for Students
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-clipboard-list text-blue-600 mr-2"></i>
                      Application Portals
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <a href="https://www.ouac.on.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OUAC</a> - Ontario Universities</li>
                      <li>• <a href="https://applyalberta.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ApplyAlberta</a> - Alberta Institutions</li>
                      <li>• <a href="https://www.educationplannerbc.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Education Planner BC</a> - BC Schools</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-dollar-sign text-green-600 mr-2"></i>
                      Financial Aid
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <a href="https://www.canada.ca/en/services/benefits/education/student-aid.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Canada Student Loans</a></li>
                      <li>• <a href="https://www.scholarshipscanada.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ScholarshipsCanada</a></li>
                      <li>• <a href="https://www.ontario.ca/page/osap-ontario-student-assistance-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OSAP</a> - Ontario Aid</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-globe text-purple-600 mr-2"></i>
                      International Students
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <a href="https://www.educanada.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EduCanada</a> - Official Portal</li>
                      <li>• <a href="https://www.wes.org/ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WES</a> - Credential Evaluation</li>
                      <li>• <a href="https://www.cicic.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CICIC</a> - Recognition Info</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-passport text-red-600 mr-2"></i>
                      Study Permits
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Study in Canada</a></li>
                      <li>• <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Study Permit Info</a></li>
                      <li>• <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Work While Studying</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Old Embassy content removed - now part of Embassy category card */}
        {false && (
            <div className="space-y-6">
              {/* Compact Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                      <i className="fas fa-flag text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Canadian Embassies Worldwide</h3>
                      <p className="text-red-100">Find Canadian diplomatic missions around the globe</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <i className="fas fa-maple-leaf text-4xl text-white opacity-20"></i>
                  </div>
                </div>
              </div>

              {/* Info Bar */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-600 text-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  Official data from Global Affairs Canada. Visit 
                  <a href="https://travel.gc.ca/assistance/embassies-consulates" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    Travel.gc.ca
                  </a> for current information.
                </div>
              </div>

              {/* Toggleable Embassy Cards */}
              <div className="space-y-4">
                {getAllEmbassies().map((continent, continentIndex) => (
                  <div key={continentIndex} className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                      onClick={() => toggleContinent(continent.continent)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-full">
                          <i className="fas fa-globe-americas text-white"></i>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{continent.continent}</h4>
                          <p className="text-sm text-gray-600">
                            {continent.countries.length} {continent.countries.length === 1 ? 'country' : 'countries'}
                            {!isExpanded(continent.continent) && <span className="ml-2 text-blue-600 font-medium">Click to expand</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                        <i className={`fas fa-chevron-${isExpanded(continent.continent) ? 'up' : 'down'} text-gray-600 transition-transform text-sm`}></i>
                      </div>
                    </div>
                    
                    {isExpanded(continent.continent) && (
                      <div className="p-4 pt-0 border-t border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                          {continent.countries.map((countryData, countryIndex) => (
                            <Card key={countryIndex} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                              <div className="bg-gray-50 p-4 border-b">
                                <div className="flex items-center space-x-2">
                                  <div className="bg-red-100 p-1.5 rounded-full">
                                    <i className="fas fa-flag text-red-600 text-sm"></i>
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-gray-800">{countryData.country}</h5>
                                    <p className="text-xs text-gray-600">{countryData.missions.length} {countryData.missions.length === 1 ? 'mission' : 'missions'}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <CardContent className="p-4">
                                <div className="space-y-4">
                                  {countryData.missions.map((mission, missionIndex) => (
                                    <div key={missionIndex} className="border-l-3 border-red-400 pl-3 py-2">
                                      <div className="flex items-center justify-between mb-2">
                                        <h6 className="font-semibold text-gray-800 text-sm">{mission.name}</h6>
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                          {mission.type}
                                        </span>
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                          <i className="fas fa-map-marker-alt text-red-500 w-4 mr-2"></i>
                                          <span className="font-medium text-gray-700">{mission.city}</span>
                                        </div>
                                        <div className="flex items-start">
                                          <i className="fas fa-building text-gray-500 w-4 mr-2 mt-0.5"></i>
                                          <span className="text-gray-600 text-xs leading-relaxed">{mission.address}</span>
                                        </div>
                                        <div className="flex items-center">
                                          <i className="fas fa-phone text-green-600 w-4 mr-2"></i>
                                          <a href={`tel:${mission.phone}`} className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                                            {mission.phone}
                                          </a>
                                        </div>
                                        <div className="flex items-center">
                                          <i className="fas fa-globe text-blue-600 w-4 mr-2"></i>
                                          <a 
                                            href={mission.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center"
                                          >
                                            Visit Website
                                            <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                          </a>
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
                    )}
                  </div>
                ))}
              </div>

              {/* Compact Emergency Section */}
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="bg-red-200 p-2 rounded-full mr-3">
                    <i className="fas fa-exclamation-triangle text-red-700"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800">Emergency Consular Assistance</h4>
                    <p className="text-red-700 text-sm">24/7 emergency support for Canadians abroad</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="tel:1-888-949-9993" className="flex items-center p-3 bg-white rounded-lg hover:bg-red-50 transition-colors border border-red-200">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <i className="fas fa-phone text-red-700"></i>
                    </div>
                    <div>
                      <p className="text-red-800 font-bold text-sm">1-888-949-9993</p>
                      <p className="text-red-600 text-xs">Toll-free emergency line</p>
                    </div>
                  </a>
                  <a href="mailto:sos@international.gc.ca" className="flex items-center p-3 bg-white rounded-lg hover:bg-red-50 transition-colors border border-red-200">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <i className="fas fa-envelope text-red-700"></i>
                    </div>
                    <div>
                      <p className="text-red-800 font-bold text-sm">sos@international.gc.ca</p>
                      <p className="text-red-600 text-xs">Emergency email support</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
        )}





        {/* Contact Content */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            {/* Contact Header */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <i className="fas fa-envelope text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Have suggestions for new government services, found broken links, or want to report an issue? 
                  We'd love to hear from you and continuously improve the Canada Access Hub.
                </p>
              </div>
            </div>

            {/* Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quick Response</h3>
                    <p className="text-sm opacity-90">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <i className="fas fa-shield-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Secure & Private</h3>
                    <p className="text-sm opacity-90">Your information is protected</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Community Driven</h3>
                    <p className="text-sm opacity-90">Built with user feedback</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />

            {/* Additional Resources */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                  Additional Ways to Help
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-link text-indigo-600 mr-2"></i>
                      Suggest New Links
                    </h4>
                    <p className="text-sm text-gray-600">
                      Know of important government services missing from our directory? 
                      Let us know and we'll add them to help other Canadians.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">
                      <i className="fas fa-bug text-red-600 mr-2"></i>
                      Report Issues
                    </h4>
                    <p className="text-sm text-gray-600">
                      Found a broken link or outdated information? 
                      Report it so we can keep the directory accurate and up-to-date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Back to Top Button */}
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 md:hidden"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
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
            <p className="text-gray-400 text-sm mb-2">&copy; 2025 Canada Access Hub</p>
            <a 
              href="/privacy.html" 
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            
            {/* Blue Semi-Transparent Bars */}
            <div className="mt-6 h-4 bg-blue-600 bg-opacity-5 w-full"></div>
            <div className="mt-5 h-4 bg-blue-600 bg-opacity-5 w-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}