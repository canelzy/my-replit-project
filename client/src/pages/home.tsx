import React, { useState, useEffect } from "react";
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
  ]
};

const linksData: Record<string, LinkItem[]> = {
  "Toronto Non-Profits": [
    { title: "United Way Greater Toronto", description: "Leading funder of social services in the Greater Toronto Area", url: "https://www.unitedwaygt.org/", icon: "fas fa-hands-helping" },
    { title: "Toronto Foundation", description: "Community foundation supporting charitable causes in Toronto", url: "https://www.torontofoundation.ca/", icon: "fas fa-donate" },
    { title: "Centre for Addiction and Mental Health (CAMH)", description: "Canada's largest mental health and addiction hospital", url: "https://www.camh.ca/", icon: "fas fa-brain" },
    { title: "SickKids Foundation", description: "Supporting The Hospital for Sick Children in Toronto", url: "https://www.sickkidsfoundation.com/", icon: "fas fa-child" },
    { title: "Toronto Public Library Foundation", description: "Supporting library services and programs across Toronto", url: "https://www.torontopubliclibrary.ca/", icon: "fas fa-book" }
  ],
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

// Toronto Non-Profits by Category
const torontoNonProfitsData = {
  "Settlement & Employment": [
    {
      name: "COSTI Immigrant Services",
      url: "https://costi.org/",
      description: "Immigrant and refugee resettlement, employment services, English classes, housing, and youth programs. Address: 1710 Dufferin St, Toronto, ON M6E 3P2. Phone: (416) 658-1600. Email: info@costi.org"
    },
    {
      name: "CultureLink Settlement and Community Services",
      url: "https://culturelink.ca/",
      description: "Support for newcomers, refugees, LGBTQ+ immigrants, and youth. Offers mentorship, language and employment programs. Address: 2340 Dundas St W, Toronto, ON M6P 4A9. Phone: (416) 588-6288. Email: info@culturelink.ca"
    },
    {
      name: "The Neighbourhood Organization (TNO)",
      url: "https://tno-toronto.org/",
      description: "Settlement services, youth and seniors programming, employment readiness, and language classes. Address: 18 Thorncliffe Park Dr, Toronto, ON M4H 1N7. Phone: (416) 421-3054. Email: info@tno-toronto.org"
    },
    {
      name: "ACCES Employment",
      url: "https://accesemployment.ca/",
      description: "Job search support, sector-specific bridging programs, and hiring connections for newcomers and job seekers. Address: 489 College St, Suite 100, Toronto, ON M6G 1A5. Phone: (416) 921-1800. Email: info@accesemployment.ca"
    },
    {
      name: "Toronto Region Immigrant Employment Council (TRIEC)",
      url: "https://triec.ca/",
      description: "Connects skilled immigrants with mentors, employers, and training opportunities. Advocates for inclusive hiring. Address: 25 York St, Suite 2200, Toronto, ON M5J 2V5. Phone: (416) 944-1946. Email: info@triec.ca"
    },
    {
      name: "JobStart",
      url: "https://jobstart.org/",
      description: "Employment services for newcomers, youth, adults, and persons with disabilities. Address: 2930 Lake Shore Blvd W, Toronto, ON M8V 1J4. Phone: (416) 231-2295. Email: information@jobstart.org"
    },
    {
      name: "YMCA of Greater Toronto – Newcomer and Employment Services",
      url: "https://ymcagta.org/",
      description: "Offers newcomer orientation, employment counselling, language classes, and youth integration programs. Address: 2200 Yonge St, Toronto, ON M4S 2C6. Phone: (416) 928-9622. Email: info@ymcagta.org"
    },
    {
      name: "Working Women Community Centre",
      url: "https://workingwomencc.org/",
      description: "Settlement services for immigrant women, housing help, and employment workshops. Address: 5 Fairview Mall Dr, Suite 478, Toronto, ON M2J 2Z1. Phone: (416) 494-7978. Email: info@workingwomencc.org"
    },
    {
      name: "OCASI – Ontario Council of Agencies Serving Immigrants",
      url: "https://ocasi.org/",
      description: "Policy and support organization for immigrant-serving agencies. Offers public education and anti-racism training. Address: 110 Eglinton Ave W, Suite 200, Toronto, ON M4R 1A3. Phone: (416) 322-4950. Email: info@ocasi.org"
    },
    {
      name: "Skills for Change",
      url: "https://skillsforchange.org/",
      description: "Employment training, mentorship, language programs, and entrepreneurship supports for newcomers. Address: 791 St. Clair Ave W, Toronto, ON M6C 1B7. Phone: (416) 658-3101. Email: info@skillsforchange.org"
    },
    {
      name: "North York Community House (NYCH)",
      url: "https://nych.ca/",
      description: "Newcomer settlement services, English classes, employment help, family and youth programs. Address: 700 Lawrence Ave W, Suite 226, Toronto, ON M6A 3B4. Phone: (416) 784-0920. Email: info@nych.ca"
    },
    {
      name: "Newcomer Women's Services Toronto (NEW)",
      url: "https://newcomerwomen.org/",
      description: "Employment and training programs tailored for immigrant and refugee women. Address: 745 Danforth Ave, Suite 401, Toronto, ON M4J 1L4. Phone: (416) 469-0196. Email: general@newcomerwomen.org"
    },
    {
      name: "Catholic Crosscultural Services (CCS)",
      url: "https://ccsyr.org/",
      description: "Settlement help, employment preparation, LINC classes, and refugee sponsorship. Address: 55 Town Centre Court, Suite 401, Scarborough, ON M1P 4X4. Phone: (416) 757-7010. Email: general@ccsby.org"
    },
    {
      name: "Arab Community Centre of Toronto (ACCT)",
      url: "https://acctonline.ca/",
      description: "Serves Arab-speaking newcomers with settlement, employment, and mental health supports. Address: 28 Overlea Blvd, Unit 3, Toronto, ON M4H 1B6. Phone: (416) 231-7746. Email: acct@acctonline.ca"
    },
    {
      name: "Centre for Immigrant and Community Services (CICS)",
      url: "https://cicscanada.com/",
      description: "Settlement help, employment training, seniors support, and youth leadership programs. Address: 2330 Midland Ave, Toronto, ON M1S 5G5. Phone: (416) 292-7510. Email: info@cicscanada.com"
    },
    {
      name: "Bloor Information and Life Skills Centre",
      url: "https://bloorinfoskills.org/",
      description: "Employment and settlement services for newcomers and underemployed Torontonians. Address: 672 Dupont St, Suite 308, Toronto, ON M6G 1Z6. Phone: (416) 588-0623. Email: info@bloorinfoskills.org"
    },
    {
      name: "Polycultural Immigrant and Community Services",
      url: "https://polycultural.org/",
      description: "Multilingual newcomer services, including housing help, employment, and youth programs. Address: 3660A Midland Ave, Scarborough, ON M1V 0B8. Phone: (416) 439-1293. Email: info@polycultural.org"
    },
    {
      name: "Mennonite New Life Centre of Toronto (MNLCT)",
      url: "https://mnlct.org/",
      description: "Immigrant and refugee support, bridging programs, language training, and mental health services. Address: 1774 Queen St E, Toronto, ON M4L 1G7. Phone: (416) 699-4527. Email: info@mnlct.org"
    },
    {
      name: "Rexdale Women's Centre",
      url: "https://rexdalewomen.org/",
      description: "Multicultural women-focused settlement and employment programs. Address: 925 Albion Rd, Suite 309, Etobicoke, ON M9V 1A6. Phone: (416) 745-0062. Email: info@rexdalewomen.org"
    },
    {
      name: "Employment and Education Centre (EEC)",
      url: "https://eecentre.org/",
      description: "Employment placement, career coaching, and skills upgrading for newcomers. Address: 340 College St, Suite 100, Toronto, ON M5T 3A9. Phone: (416) 928-3536. Email: info@eecentre.org"
    },
    {
      name: "The Career Foundation",
      url: "https://careerfoundation.com/",
      description: "Job matching, resume support, youth training, and programs for internationally trained professionals. Address: 700 Lawrence Ave W, Suite 420, Toronto, ON M6A 3B4. Phone: (416) 789-4862. Email: info@careerfoundation.org"
    },
    {
      name: "JVS Toronto",
      url: "https://jvstoronto.org/",
      description: "Employment, career counselling, newcomer programs, and disability employment services. Address: 74 Tycos Dr, Toronto, ON M6B 1V9. Phone: (416) 787-1151. Email: info@jvstoronto.org"
    },
    {
      name: "Afghan Women's Organization (AWO) Refugee and Immigrant Services",
      url: "https://afghanwomen.org/",
      description: "Specialized support for Afghan and other newcomer women and families, including ESL, settlement, and job training. Address: 305 Milner Ave, Suite 314, Scarborough, ON M1B 3V4. Phone: (416) 588-3585. Email: info@afghanwomen.org"
    },
    {
      name: "Black Creek Community Health Centre – Newcomer Services",
      url: "https://bcchc.com/",
      description: "Health and settlement support, especially for low-income and racialized communities in the Jane-Finch area. Address: 2202 Jane St, Toronto, ON M3M 1A4. Phone: (416) 249-8000. Email: info@bcchc.com"
    },
    {
      name: "Scadding Court Community Centre – Newcomer Services",
      url: "https://scaddingcourt.org/",
      description: "Integrated settlement support, employment readiness, and small business supports for newcomers. Address: 707 Dundas St W, Toronto, ON M5T 2W6. Phone: (416) 392-0335. Email: info@scaddingcourt.org"
    },
    {
      name: "Centre Francophone du Grand Toronto",
      url: "https://centrefranco.org/",
      description: "Offers French-language services including settlement, employment, and health care for Francophone immigrants. Address: 555 Richmond St W, Suite 303, Toronto, ON M5V 3B1. Phone: (416) 922-2672. Email: info@centrefranco.org"
    },
    {
      name: "WoodGreen Community Services",
      url: "https://woodgreen.org/",
      description: "Comprehensive services including housing, employment, newcomer support, seniors care, and youth programs. Address: 815 Danforth Ave, Toronto, ON M4J 1L2. Phone: (416) 645-6000. Email: info@woodgreen.org"
    },
    {
      name: "Sojourn House",
      url: "https://sojournhouse.org/",
      description: "Transitional housing and settlement support for refugees and asylum seekers. Address: 101 Ontario St, Toronto, ON M5A 2V2. Phone: (416) 864-0515. Email: info@sojournhouse.org"
    },
    {
      name: "Fred Victor – Employment & Training Services",
      url: "https://fredvictor.org/",
      description: "Offers housing, employment services, and mental health support, particularly for marginalized populations. Address: 20 Dundas St E, 5th Floor, Toronto, ON M5B 2H6. Phone: (416) 364-8228. Email: info@fredvictor.org"
    },
    {
      name: "Access Alliance Multicultural Health and Community Services",
      url: "https://accessalliance.ca/",
      description: "Health, employment, and settlement support for immigrants, refugees, and racialized communities. Address: 340 College St, Suite 500, Toronto, ON M5T 3A9. Phone: (416) 324-8677. Email: info@accessalliance.ca"
    },
    {
      name: "COSTI Immigrant Services – Vaughan Employment Services",
      url: "https://costi.org/",
      description: "Full range of settlement, housing, and employment services for immigrants and refugees. Address: 3100 Rutherford Rd, Suite 102, Vaughan, ON L4K 0G6. Phone: (905) 669-5627. Email: info@costi.org"
    },
    {
      name: "Working Women Community Centre",
      url: "https://workingwomencc.org/",
      description: "Supports immigrant women and families with employment readiness, ESL, and leadership programs. Address: 533A Gladstone Ave, Toronto, ON M6H 3J1. Phone: (416) 532-2824. Email: info@workingwomencc.org"
    },
    {
      name: "CUIAS Immigrant Services",
      url: "https://cuias.org/",
      description: "Offers LINC English classes, employment services, and orientation programs for Ukrainian and other immigrants. Address: 2885 Bloor St W, Suite 202, Toronto, ON M8X 1B3. Phone: (416) 767-4595. Email: info@cuias.org"
    },
    {
      name: "Skills for Change",
      url: "https://skillsforchange.org/",
      description: "Pioneers in employment, mentoring, entrepreneurship, and language training for newcomers. Address: 791 St Clair Ave W, Toronto, ON M6C 1B7. Phone: (416) 658-3101. Email: info@skillsforchange.org"
    },
    {
      name: "ACCES Employment",
      url: "https://accesemployment.ca/",
      description: "Employment and career programs for newcomers and skilled immigrants. Address: 489 College St, Suite 100, Toronto, ON M6G 1A5. Phone: (416) 921-1800. Email: info@accesemployment.ca"
    },
    {
      name: "CultureLink Settlement and Community Services",
      url: "https://culturelink.ca/",
      description: "Programs for youth, seniors, newcomers, and LGBTQ+ immigrants. Address: 2340 Dundas St W, Suite 301, Toronto, ON M6P 4A9. Phone: (416) 588-6288. Email: info@culturelink.ca"
    },
    {
      name: "Immigrant Women Services Toronto (IWST)",
      url: "https://iwstoronto.org/",
      description: "Offers settlement services, trauma support, and job training for immigrant and refugee women. Address: 789 Don Mills Rd, Suite 501, Toronto, ON M3C 1T5. Phone: (416) 323-9986. Email: info@iwstoronto.org"
    },
    {
      name: "Achev (formerly MicroSkills)",
      url: "https://achev.ca/",
      description: "Job readiness, career development, newcomer integration. Phone: (416) 247-7181. Email: info@achev.ca"
    },
    {
      name: "YMCAs of Greater Toronto – Newcomer Services",
      url: "https://ymcagta.org/",
      description: "Career and settlement supports for immigrants, youth employment, English assessment. Address: 2200 Yonge St, Toronto, ON M4S 2C6. Phone: (416) 928-3362. Email: contactcentre@ymcagta.org"
    },
    {
      name: "JobStart",
      url: "https://jobstartworks.org/",
      description: "Employment support for youth, newcomers, persons with disabilities, and job seekers with barriers. Address: 219 Dufferin St, Suite 1C, Toronto, ON M6K 3J1. Phone: (416) 231-2295. Email: info@jobstartworks.org"
    }
  ],
  "Arts & Culture": [
    {
      name: "Toronto Arts Council",
      url: "https://torontoartscouncil.org/",
      description: "Supporting artists and arts organizations in Toronto."
    },
    {
      name: "Canadian Opera Company",
      url: "https://www.coc.ca/",
      description: "Canada's largest opera company based in Toronto."
    },
    {
      name: "Toronto Symphony Orchestra",
      url: "https://www.tso.ca/",
      description: "One of Canada's leading orchestras."
    },
    {
      name: "The Theatre Centre",
      url: "https://www.theatrecentre.org/",
      description: "Supporting contemporary theatre in Toronto."
    },
    {
      name: "Harbourfront Centre",
      url: "https://www.harbourfrontcentre.com/",
      description: "Contemporary arts and culture programming."
    }
  ],
  "Youth & LGBTQ+": [
    {
      name: "The 519",
      url: "https://the519.org/",
      description: "Leading LGBTQ+ community centre offering newcomer services, youth programs, trans ID clinics, and advocacy. Address: 519 Church St, Toronto, ON M4Y 2C9. Phone: (416) 392-6874. Email: info@the519.org"
    },
    {
      name: "SKETCH Working Arts",
      url: "https://sketch.ca/",
      description: "Supports youth 16–29 living homeless or on the margins through arts, creative enterprise, and mentorship. Address: 401 Richmond St W, Toronto, ON M5V 3A8. Phone: (416) 506-8956. Email: info@sketch.ca"
    },
    {
      name: "Supporting Our Youth (SOY) – Sherbourne Health",
      url: "https://sherbourne.on.ca/soy/",
      description: "Programs for 2SLGBTQ youth aged 29 and under, including housing, health, mentoring, and peer leadership. Address: 333 Sherbourne St, Toronto, ON M5A 2S5. Phone: (416) 324-4180. Email: soy@sherbourne.on.ca"
    },
    {
      name: "Planned Parenthood Toronto (PPT)",
      url: "https://ppt.on.ca/",
      description: "Inclusive sexual and reproductive health care and education to youth aged 13–29, including LGBTQ+ supports. Address: 36B Prince Arthur Ave, Toronto, ON M5R 1A9. Phone: (416) 961-0113. Email: info@ppt.on.ca"
    },
    {
      name: "Griffin Centre Mental Health Services",
      url: "https://griffincentre.org/",
      description: "Mental health support and group programs for youth with a focus on LGBTQ+ and racialized youth. Address: 24 Wellesley St W, Toronto, ON M4Y 2X6. Phone: (416) 222-1153. Email: info@griffincentre.org"
    },
    {
      name: "Youth Assisting Youth (YAY)",
      url: "https://yay.org/",
      description: "Peer mentorship and leadership training for youth aged 6–15 by volunteers aged 16–29. Address: 1200 Markham Rd, Scarborough, ON M1H 3C3. Phone: (416) 410-3677. Email: info@yay.org"
    },
    {
      name: "Egale Canada",
      url: "https://egale.ca/",
      description: "National 2SLGBTQI advocacy with Toronto-based youth housing and mental health programming. Address: 120 Carlton St, Suite 217, Toronto, ON M5A 4K2. Phone: (416) 964-7887. Email: info@egale.ca"
    },
    {
      name: "BlackCAP – Youth and LGBTQ+ African, Caribbean, Black (ACB) Programming",
      url: "https://blackcap.ca/",
      description: "HIV/AIDS support and LGBTQ+ affirming services for Black youth in Toronto. Address: 20 Victoria St, 4th Floor, Toronto, ON M5C 2N8. Phone: (416) 977-9955. Email: info@black-cap.com"
    },
    {
      name: "Native Youth Resource Centre (NWRCT)",
      url: "https://nwrct.ca/",
      description: "Indigenous-led programming for urban Indigenous youth, including Two-Spirit and LGBTQ+ affirming supports. Address: 191 Gerrard St E, Toronto, ON M5A 2E5. Phone: (416) 963-9963. Email: reception@nwrct.ca"
    },
    {
      name: "Pride Toronto (Youth Programs)",
      url: "https://pridetoronto.com/",
      description: "Organizes Toronto's Pride celebrations and year-round 2SLGBTQ+ youth and arts programming. Address: 145 Richmond St W, Suite 405, Toronto, ON M5H 2L2. Phone: (416) 927-7433. Email: info@pridetoronto.com"
    },
    {
      name: "Friends of Ruby",
      url: "https://friendsofruby.ca/",
      description: "Mental health support and transitional housing for LGBTQI2S youth aged 16–29. Address: 257 Dundas St E, Toronto, ON M5A 1Z5. Phone: (416) 359-0237. Email: info@friendsofruby.ca"
    },
    {
      name: "Breakaway Community Services – Youth Harm Reduction Program",
      url: "https://breakawaycs.ca/",
      description: "Harm reduction and substance use support for youth, including LGBTQ+ programming. Address: 1456 Gerrard St E, Toronto, ON M4L 2A1. Phone: (416) 469-5211. Email: info@breakawaycs.ca"
    },
    {
      name: "Delisle Youth Services (Skylark Youth)",
      url: "https://skylarkyouth.org/",
      description: "Counselling and wraparound services for youth ages 0–24, with LGBTQ+ affirming supports. Address: 57 Adelaide St W, Toronto, ON M5H 1M6. Phone: (416) 544-1313. Email: info@skylarkyouth.org"
    },
    {
      name: "QTBIPOC Youth Project – Planned Parenthood Toronto",
      url: "https://ppt.on.ca/",
      description: "Peer-led programming and health support for Queer, Trans, Black, Indigenous, and racialized youth. Address: 36B Prince Arthur Ave, Toronto, ON M5R 1A9. Phone: (416) 961-0113. Email: info@ppt.on.ca"
    },
    {
      name: "Toronto Kiwanis Boys and Girls Clubs – LGBTQ+ Inclusion Programs",
      url: "https://believeinkids.ca/",
      description: "Community and after-school programs for children and youth, with inclusive spaces for LGBTQ+ youth. Address: 1640 Queen St E, Toronto, ON M4L 1G6. Phone: (416) 392-0054. Email: info@believeinkids.ca"
    },
    {
      name: "Canadian Centre for Gender & Sexual Diversity (Toronto Office)",
      url: "https://ccgsd-ccdgs.org/",
      description: "Anti-oppression and anti-bullying education, youth training, and LGBTQ+ inclusion advocacy. Address: 2 Carlton St, Suite 1306, Toronto, ON M5B 1J3. Phone: (613) 222-2215. Email: info@ccgsd-ccdgs.org"
    },
    {
      name: "Camp fYrefly – Toronto Chapter",
      url: "https://fyrefly.ualberta.ca/",
      description: "Leadership retreat for LGBTQ+ and gender-diverse youth, focused on wellness, creativity, and empowerment. Contact via website for Toronto chapter information. Email: fyrefly@ualberta.ca"
    },
    {
      name: "Rexdale Women's Centre – LGBTQ+ Newcomer Youth Programs",
      url: "https://rexdalewomen.org/",
      description: "Supports immigrant women, families, and youth with LGBTQ+-affirming programs for newcomers. Address: 925 Albion Rd, Suite 309, Etobicoke, ON M9V 1A6. Phone: (416) 745-0062. Email: info@rexdalewomen.org"
    },
    {
      name: "For Youth Initiative (FYI)",
      url: "https://foryouth.ca/",
      description: "Empowers racialized and newcomer youth with education, leadership, and employment programs. Address: 5961 Steeles Ave W, Toronto, ON M9L 2V7. Phone: (647) 748-3949. Email: info@foryouth.ca"
    },
    {
      name: "Parkdale Queen West Community Health Centre – Youth Health Program",
      url: "https://pqwchc.org/",
      description: "Inclusive youth health programs, mental health support, LGBTQ+ safe space drop-ins. Address: 168 Bathurst St, Toronto, ON M5V 2R4. Phone: (416) 703-6000. Email: info@pqwchc.org"
    },
    {
      name: "Griffin Centre – ReachOUT",
      url: "https://reachout.ca/",
      description: "Counseling, support groups, and leadership opportunities for LGBTQ+ youth and allies, especially BIPOC and newcomer communities. Address: 1126 Finch Ave W, Unit 16, Toronto, ON M3J 3J6. Phone: (416) 222-1153. Email: reachout@griffincentre.org"
    },
    {
      name: "Central Toronto Youth Services (CTYS)",
      url: "https://ctys.org/",
      description: "Mental health and support services for youth ages 12–25, including LGBTQ+ and trans youth programs. Address: 65 Wellesley St E, Suite 300, Toronto, ON M4Y 1G7. Phone: (416) 924-2100. Email: info@ctys.org"
    },
    {
      name: "YOUTHline (LGBT Youth Line)",
      url: "https://youthline.ca/",
      description: "Peer support through phone, text, and chat for LGBTQ+ youth under 29 across Ontario. Mailing Address: PO Box 73118, Wood Street PO, Toronto, ON M4Y 2W5. Phone/Text: 1-800-268-9688. Email: info@youthline.ca"
    },
    {
      name: "Asian Community AIDS Services (ACAS) – LGBTQ+ Youth Programs",
      url: "https://acas.org/",
      description: "Services for East & Southeast Asian LGBTQ+ youth, including sexual health and peer leadership. Address: 260 Spadina Ave, Suite 410, Toronto, ON M5T 2E4. Phone: (416) 963-4300. Email: youth@acas.org"
    },
    {
      name: "Access Alliance Multicultural Health and Community Services",
      url: "https://accessalliance.ca/",
      description: "Multicultural services including youth drop-ins, LGBTQ+ newcomer groups, and health access. Address: 340 College St, Suite 500, Toronto, ON M5T 3A9. Phone: (416) 324-8677. Email: info@accessalliance.ca"
    },
    {
      name: "Sprott House – YMCA of Greater Toronto",
      url: "https://ymcagta.org/",
      description: "Transitional housing program for LGBTQ2S youth experiencing homelessness. Address: 21 Walmer Rd, Toronto, ON M5R 2W7. Phone: (416) 928-9622. Email: info@ymcagta.org"
    },
    {
      name: "The Get REAL Movement",
      url: "https://thegetrealmovement.com/",
      description: "Anti-discrimination workshops in schools, focused on LGBTQ+ inclusion and allyship. Mailing Address: 1255 Bay St, Suite 2301, Toronto, ON M5R 2A9. Phone: (416) 645-0111. Email: info@thegetrealmovement.com"
    },
    {
      name: "Urban Rez Solutions – Queer Trans Youth of Colour Programming",
      url: "https://urbanrezsolutions.com/",
      description: "Mediation, social justice, and leadership development with programming for 2SLGBTQ+ youth of colour. Based in Toronto – contact via website. Phone: (416) 803-5593. Email: info@urbanrezsolutions.com"
    },
    {
      name: "Toronto District School Board – Gender-Based Violence Prevention Office",
      url: "https://tdsb.on.ca/",
      description: "LGBTQ+ affirming policies, resources, and workshops in schools. Youth-led initiatives supported through the board. Address: 5050 Yonge St, Toronto, ON M2N 5N8. Phone: (416) 397-3000."
    },
    {
      name: "Maggie's Toronto Sex Workers Action Project – Youth & Trans Outreach",
      url: "https://maggiestoronto.org/",
      description: "Harm reduction, support, and advocacy for LGBTQ+ and youth sex workers. Address: 305-569 Parliament St, Toronto, ON M4X 1P7. Phone: (647) 344-3135. Email: info@maggiestoronto.org"
    },
    {
      name: "SOY – Supporting Our Youth (Sherbourne Health)",
      url: "https://sherbourne.on.ca/soy/",
      description: "Programs for 2SLGBTQ youth including mentorship, health, and newcomer supports. Address: 333 Sherbourne St, Toronto, ON M5A 2S5. Phone: (416) 324-4180. Email: soy@sherbourne.on.ca"
    },
    {
      name: "Egale Canada",
      url: "https://egale.ca/",
      description: "National 2SLGBTQI advocacy with Toronto-based youth housing and mental health programming. Address: 120 Carlton St, Suite 217, Toronto, ON M5A 4K2. Phone: (416) 964-7887. Email: info@egale.ca"
    },
    {
      name: "The 519 – Youth Programming",
      url: "https://the519.org/",
      description: "Community hub offering inclusive youth programming, housing support, and leadership initiatives. Address: 519 Church St, Toronto, ON M4Y 2C9. Phone: (416) 392-6874. Email: info@the519.org"
    },
    {
      name: "BlackCAP – Youth and LGBTQ+ African, Caribbean, Black (ACB) Programming",
      url: "https://blackcap.ca/",
      description: "HIV/AIDS support and LGBTQ+ affirming services for Black youth in Toronto. Address: 20 Victoria St, 4th Floor, Toronto, ON M5C 2N8. Phone: (416) 977-9955. Email: info@black-cap.com"
    },
    {
      name: "StepStones for Youth",
      url: "https://stepstonesforyouth.com/",
      description: "Wraparound support for vulnerable youth including housing, mentorship, and LGBTQ+ affirming services. Address: 150 Eglinton Ave E, Suite 406, Toronto, ON M4P 1E8. Phone: (416) 893-5196. Email: info@stepstonesforyouth.com"
    },
    {
      name: "Stella's Place",
      url: "https://stellasplace.ca/",
      description: "Mental health support for youth 16–29, with inclusive services for LGBTQ+ and gender-diverse individuals. Address: 54 Wolseley St, Toronto, ON M5T 1A5. Phone: (416) 461-2345. Email: connect@stellasplace.ca"
    },
    {
      name: "ArtReach Toronto",
      url: "https://artreachtoronto.ca/",
      description: "Funding and mentorship for youth-led arts projects, prioritizing BIPOC and LGBTQ+ youth in underserved communities. Address: 401 Richmond St W, Toronto, ON M5V 3A8. Phone: (647) 802-2233. Email: info@artreachtoronto.ca"
    },
    {
      name: "West Neighbourhood House – Meeting Place Youth Programs",
      url: "https://westnh.org/",
      description: "Harm reduction, housing help, and social inclusion programs for street-involved and LGBTQ+ youth. Address: 588 Queen St W, Toronto, ON M6J 1E3. Phone: (416) 532-4828. Email: info@westnh.org"
    },
    {
      name: "The Neighbourhood Group – Youth and LGBTQ+ Services",
      url: "https://tngcs.org/",
      description: "Employment, housing, and wellness supports for youth, including dedicated LGBTQ+ outreach. Address: 349 Ontario St, Toronto, ON M5A 2V8. Phone: (416) 925-4363. Email: info@tngcs.org"
    },
    {
      name: "Native Youth Resource Centre (NWRCT)",
      url: "https://nwrct.ca/",
      description: "Indigenous-led programming for urban Indigenous youth, including Two-Spirit and LGBTQ+ affirming supports. Address: 191 Gerrard St E, Toronto, ON M5A 2E5. Phone: (416) 963-9963. Email: reception@nwrct.ca"
    }
  ],
  "Food Security": [
    {
      name: "Daily Bread Food Bank",
      url: "https://www.dailybread.ca/",
      description: "Toronto's largest food bank providing emergency food assistance. Address: 191 New Toronto St, Etobicoke, ON M8V 2E7. Phone: (416) 203-0050. Email: info@dailybread.ca"
    },
    {
      name: "North York Harvest Food Bank",
      url: "https://www.northyorkharvest.com/",
      description: "Food bank serving North York communities. Address: 1899 Weston Rd, North York, ON M9N 1V5. Phone: (416) 635-7771. Email: info@northyorkharvest.com"
    },
    {
      name: "Good Shepherd Centres",
      url: "https://www.goodshepherd.ca/",
      description: "Food programs and support services for vulnerable populations. Address: 412 Queen St E, Toronto, ON M5A 1T3. Phone: (416) 203-6097. Email: info@goodshepherd.ca"
    },
    {
      name: "Stop Community Food Centre",
      url: "https://www.thestop.org/",
      description: "Community food programs and advocacy. Address: 1884 Davenport Rd, Toronto, ON M6N 1B7. Phone: (416) 652-7867. Email: info@thestop.org"
    },
    {
      name: "FoodShare Toronto",
      url: "https://foodshare.net/",
      description: "Food access programs and urban agriculture. Address: 90 Croatia St, Toronto, ON M6H 1K9. Phone: (416) 363-6441. Email: info@foodshare.net"
    },
    {
      name: "Second Harvest",
      url: "https://secondharvest.ca/",
      description: "Food rescue and redistribution to agencies across the GTA. Address: 1450 Lakeshore Rd E, Mississauga, ON L5E 1E9. Phone: (905) 874-3301. Email: info@secondharvest.ca"
    },
    {
      name: "East York East Toronto Family Resources",
      url: "https://www.eyetfr.ca/",
      description: "Food bank and family support services in East York. Address: 1 Vendome Pl, Toronto, ON M4G 2L4. Phone: (416) 424-8545. Email: info@eyetfr.ca"
    },
    {
      name: "St. Felix Centre",
      url: "https://stfelixcentre.org/",
      description: "Food bank and community programs in Parkdale. Address: 25 Augusta Ave, Toronto, ON M5T 2L4. Phone: (416) 925-1330. Email: info@stfelixcentre.org"
    },
    {
      name: "Scarborough Food Security Initiative",
      url: "https://www.scarboroughfoodsecurity.ca/",
      description: "Food access programs across Scarborough communities. Address: 200 Town Centre Ct, Scarborough, ON M1P 4Y1. Phone: (416) 392-0054. Email: info@scarboroughfoodsecurity.ca"
    },
    {
      name: "Toronto Drop-In Network",
      url: "https://www.tdin.ca/",
      description: "Meal programs and food services for homeless individuals. Address: 40 Oaks Ave, Toronto, ON M4J 1J7. Phone: (416) 392-0054. Email: info@tdin.ca"
    },
    {
      name: "Red Door Family Shelter",
      url: "https://www.reddoorshelter.ca/",
      description: "Emergency food and shelter services for families. Address: 875 Queen St W, Toronto, ON M6J 1G5. Phone: (416) 203-9000. Email: info@reddoorshelter.ca"
    },
    {
      name: "Sistering",
      url: "https://www.sistering.org/",
      description: "Drop-in meals and food programs for women. Address: 962 Bloor St W, Toronto, ON M6H 1L6. Phone: (416) 926-9762. Email: info@sistering.org"
    },
    {
      name: "St. Simon's Shelter",
      url: "https://www.stsimons.ca/",
      description: "Emergency shelter with daily meals and food programs. Address: 155 Sherbourne St, Toronto, ON M5A 2R5. Phone: (416) 392-1054. Email: info@stsimons.ca"
    },
    {
      name: "Flemingdon Health Centre",
      url: "https://www.flemingdonhealth.org/",
      description: "Community health center with food security programs. Address: 10 Gateway Blvd, Toronto, ON M3C 3A1. Phone: (416) 429-9101. Email: info@flemingdonhealth.org"
    },
    {
      name: "Parkdale Food Centre",
      url: "https://www.parkdalefoodcentre.org/",
      description: "Food bank and community kitchen in Parkdale. Address: 1499 Queen St W, Toronto, ON M6R 1A3. Phone: (416) 532-1734. Email: info@parkdalefoodcentre.org"
    },
    {
      name: "Christie Refugee Welcome Centre",
      url: "https://www.christierefugeecentre.ca/",
      description: "Food programs and support for refugees and newcomers. Address: 3 Evelyn Cres, Toronto, ON M6H 1V8. Phone: (416) 588-1612. Email: info@christierefugeecentre.ca"
    },
    {
      name: "Mosque Kitchen",
      url: "https://www.mosquekitchen.ca/",
      description: "Community kitchen serving free meals to anyone in need. Address: 168 Dundas St W, Toronto, ON M5G 1C7. Phone: (416) 368-4142. Email: info@mosquekitchen.ca"
    },
    {
      name: "St. Luke's United Church Food Bank",
      url: "https://www.stlukeunited.ca/",
      description: "Community food bank serving East Toronto. Address: 353 Sherbourne St, Toronto, ON M5A 2S5. Phone: (416) 921-1357. Email: info@stlukeunited.ca"
    },
    {
      name: "Bloor Street United Church Food Bank",
      url: "https://www.bloorstreetunited.org/",
      description: "Weekly food bank serving the Annex and downtown area. Address: 300 Bloor St W, Toronto, ON M5S 1W3. Phone: (416) 924-1365. Email: info@bloorstreetunited.org"
    },
    {
      name: "Dixon Hall Neighbourhood Services",
      url: "https://www.dixonhall.org/",
      description: "Food bank and community services in Regent Park. Address: 58 Sumach St, Toronto, ON M5A 3J7. Phone: (416) 863-0499. Email: info@dixonhall.org"
    },
    {
      name: "Fort York Food Bank",
      url: "https://www.fortyorkfoodbank.com/",
      description: "Food bank serving downtown Toronto residents. Address: 105 The Esplanade, Toronto, ON M5E 1X9. Phone: (416) 392-1234. Email: info@fortyorkfoodbank.com"
    },
    {
      name: "Riverdale Community Food Bank",
      url: "https://www.riverdalefoodbank.org/",
      description: "Community food bank serving Riverdale and East Toronto. Address: 1652 Gerrard St E, Toronto, ON M4L 2A7. Phone: (416) 469-9756. Email: info@riverdalefoodbank.org"
    },
    {
      name: "Community Food Centres Canada",
      url: "https://cfccanada.ca/",
      description: "Network of community food centers across Canada. Toronto Office: 150 Danforth Ave, Toronto, ON M4K 1N1. Phone: (416) 200-9956. Email: info@cfccanada.ca"
    },
    {
      name: "Lakeshore Area Multi-Service Project (LAMP)",
      url: "https://www.lampchc.org/",
      description: "Food bank and community services in Etobicoke. Address: 185 Fifth St, Etobicoke, ON M8V 2Z5. Phone: (416) 252-6471. Email: info@lampchc.org"
    },
    {
      name: "Thorncliffe Neighbourhood Office",
      url: "https://www.thorncliffeno.ca/",
      description: "Food programs and community services in Thorncliffe Park. Address: 45 Overlea Blvd, Toronto, ON M4H 1C3. Phone: (416) 421-1497. Email: info@thorncliffeno.ca"
    },
    {
      name: "Lawrence Heights Community Health Centre",
      url: "https://www.lhchc.org/",
      description: "Community health center with food security programs. Address: 15 Replin Rd, Toronto, ON M6A 2K4. Phone: (416) 787-1500. Email: info@lhchc.org"
    },
    {
      name: "Jane Finch Community and Family Centre",
      url: "https://www.janefinchcentre.org/",
      description: "Food bank and family support services in Jane and Finch. Address: 4400 Jane St, Toronto, ON M3N 2K4. Phone: (416) 663-2978. Email: info@janefinchcentre.org"
    },
    {
      name: "Malvern Family Resource Centre",
      url: "https://www.malvernfrc.org/",
      description: "Food programs and family support in Malvern. Address: 30 Sewells Rd, Toronto, ON M1B 3G5. Phone: (416) 287-1144. Email: info@malvernfrc.org"
    },
    {
      name: "Rexdale Community Health Centre",
      url: "https://www.rexdalechc.com/",
      description: "Community health center with food security programs. Address: 8 Taber Rd, Toronto, ON M9W 3A4. Phone: (416) 744-0066. Email: info@rexdalechc.com"
    },
    {
      name: "Wychwood Open Door",
      url: "https://wychwoodopendoor.org/",
      description: "Serves hot meals and provides food bank services in midtown Toronto. Address: 729 St Clair Ave W, Toronto, ON M6C 1B2 (St. Matthew's Church). Phone: (416) 652-7867 ext. 222. Email: wychwoodopendoor@gmail.com"
    },
    {
      name: "Aangen – Community Food Redistribution",
      url: "https://aangen.com/",
      description: "Redistributes surplus food, operates social enterprises, and supports food access for vulnerable communities. Address: 14 Shirley St, Toronto, ON M6K 1S9. Phone: (647) 235-3972. Email: info@aangen.com"
    },
    {
      name: "Access Alliance Multicultural Health and Community Services",
      url: "https://accessalliance.ca/",
      description: "Offers newcomer-focused food programming, including food hampers and cultural food literacy. Address: 340 College St, Toronto, ON M5T 3A9. Phone: (416) 324-8677. Email: info@accessalliance.ca"
    },
    {
      name: "Toronto Foundation for Student Success – Feed Tomorrow",
      url: "https://tfss.ca/",
      description: "Provides school meals and snack programs for thousands of Toronto students. Address: 2 Trethewey Dr, 4th Floor, Toronto, ON M6M 4A8. Phone: (416) 394-6880. Email: general@tfss.ca"
    },
    {
      name: "Yonge Street Mission – Evergreen Centre",
      url: "https://ysm.ca/",
      description: "Offers daily meals and groceries for youth, families, and adults experiencing poverty. Address: 365 Spadina Ave, Toronto, ON M5T 2G3. Phone: (416) 929-9614. Email: info@ysm.ca"
    },
    {
      name: "Native Women's Resource Centre of Toronto",
      url: "https://nwrct.ca/",
      description: "Serves Indigenous women and families with emergency food, community meals, and pantry support. Address: 191 Gerrard St E, Toronto, ON M5A 2E5. Phone: (416) 963-9963. Email: info@nwrct.ca"
    },
    {
      name: "Agincourt Community Services Association (ACSA) – Food Security",
      url: "https://agincourtcommunityservices.com/",
      description: "Offers Scarborough-wide food distribution, meal kits, and seniors' nutrition services. Address: 4155 Sheppard Ave E, Scarborough, ON M1S 1T4. Phone: (416) 321-6912. Email: info@agincourtcommunityservices.com"
    },
    {
      name: "St. Stephen's Community House – Kensington Market Meal Programs",
      url: "https://sschto.ca/",
      description: "Serves marginalized community members with food access, drop-ins, and meal delivery. Address: 260 Augusta Ave, Toronto, ON M5T 2L9. Phone: (416) 925-2103. Email: info@sschto.ca"
    },
    {
      name: "Building Roots",
      url: "https://buildingroots.ca/",
      description: "Operates a container market and food programs in Moss Park and underserved areas. Address: 260 Sackville St (Moss Park Market), Toronto, ON M5A 3G1. Email: info@buildingroots.ca"
    },
    {
      name: "Faith in Action Food Bank – Malvern Methodist Church",
      url: "https://malvernmethodistchurch.org/",
      description: "Operates a volunteer-led food bank in partnership with local faith and community groups. Address: 2 Morningview Trail, Scarborough, ON M1B 5A2. Phone: (416) 281-5097. Email: malvernmethodist@rogers.com"
    },
    {
      name: "St. James Food Basket",
      url: "https://stjamesfoodbasket.com/",
      description: "Volunteer-run food bank supporting low-income residents in Toronto's west end. Address: 4020 Dundas St W, Toronto, ON M6S 4W6 (St. James Anglican Church). Phone: (416) 767-6451. Email: info@stjamesfoodbasket.com"
    },
    {
      name: "Native Canadian Centre of Toronto – Food Security Support",
      url: "https://ncct.on.ca/",
      description: "Provides food hampers and cultural meals to Indigenous community members. Address: 16 Spadina Rd, Toronto, ON M5R 2S7. Phone: (416) 964-9087. Email: info@ncct.on.ca"
    },
    {
      name: "Moss Park Consumption and Treatment Service – Food Access Support",
      url: "https://ctsmosspark.ca/",
      description: "Distributes snacks, food, and harm reduction supplies to clients accessing supervised consumption services. Address: 134 Sherbourne St, Toronto, ON M5A 2R6. Phone: (647) 588-3059. Email: info@ctsmosspark.ca"
    },
    {
      name: "Canadian Muslim Women's Institute – Community Food Hampers",
      url: "https://cmwi.ca/",
      description: "Offers culturally relevant food security supports and hampers for Muslim women and families. Address: 1320 Islington Ave, Etobicoke, ON M9A 5C6. Phone: (416) 901-8500. Email: info@cmwi.ca"
    },
    {
      name: "Seeds of Hope Foundation – 6 St. Joseph House",
      url: "https://seedsofhope.ca/",
      description: "Distributes daily meals, groceries, and hygiene kits to unhoused and low-income individuals. Address: 6 St. Joseph St, Toronto, ON M4Y 1J7. Phone: (416) 923-8836. Email: info@seedsofhope.ca"
    },
    {
      name: "Good Shepherd Ministries",
      url: "https://goodshepherd.ca/",
      description: "Daily hot meals, emergency shelter, and health services for homeless and vulnerable populations. Address: 412 Queen St E, Toronto, ON M5A 1T3. Phone: (416) 869-3619. Email: info@goodshepherd.ca"
    },
    {
      name: "The Neighbourhood Group – Community Food Programs",
      url: "https://tngcs.org/",
      description: "Delivers hot meals and groceries to isolated seniors and low-income households. Address: 349 Ontario St, Toronto, ON M5A 2V8. Phone: (416) 925-4363. Email: info@tngcs.org"
    },
    {
      name: "Loaves and Fishes – Church of the Redeemer",
      url: "https://theredeemer.ca/",
      description: "Weekly meal program offering hot food to people experiencing homelessness in the Annex. Address: 162 Bloor St W, Toronto, ON M5S 1M4. Phone: (416) 922-4948. Email: office@theredeemer.ca"
    },
    {
      name: "Room to Grow – Urban Farming & Food Literacy",
      url: "https://roomtogrow.ca/",
      description: "Promotes food education and school-based gardening programs in Toronto. Operates citywide from Green Thumbs Growing Kids & partners. Email: info@roomtogrow.ca"
    },
    {
      name: "North York Women's Shelter – Food & Basic Needs Program",
      url: "https://nyws.ca/",
      description: "Provides emergency shelter, food, and basic supplies to women and children fleeing violence. Confidential location (North York). Phone: (416) 638-7335. Email: info@nyws.ca"
    },
    {
      name: "Afri-Can FoodBasket",
      url: "https://africanfoodbasket.ca/",
      description: "Supports Black food sovereignty through urban farming, youth education, and culturally relevant food access. Address: 455 Cosburn Ave, Toronto, ON M4J 2N2. Phone: (416) 832-5639. Email: info@africanfoodbasket.ca"
    },
    {
      name: "Greenest City",
      url: "https://greenestcity.ca/",
      description: "Community gardens and environmental education in Parkdale, focused on newcomer and low-income communities. Address: 201 Cowan Ave, Toronto, ON M6K 2N5. Phone: (647) 438-0038. Email: info@greenestcity.ca"
    },
    {
      name: "Fort York Food Bank",
      url: "https://fyfb.com/",
      description: "Emergency groceries and meals for people in downtown Toronto. Address: 380 College St, Lower Level, Toronto, ON M5T 1S6. Phone: (416) 203-3011. Email: info@fyfb.com"
    },
    {
      name: "South Riverdale Community Health Centre – Food Programs",
      url: "https://srchc.ca/",
      description: "Nutrition and food programs including markets, gardens, and cooking classes. Address: 955 Queen St E, Toronto, ON M4M 3P3. Phone: (416) 461-1925. Email: info@srchc.com"
    },
    {
      name: "Eastview Neighbourhood Community Centre – Food Bank",
      url: "https://eastviewcentre.com/",
      description: "Food bank, meal programs, and support for low-income families and seniors. Address: 86 Blake St, Toronto, ON M4J 3C9. Phone: (416) 392-1750. Email: info@eastviewcentre.com"
    },
    {
      name: "St. Felix Centre – Meal Programs",
      url: "https://stfelixcentre.org/",
      description: "Drop-in meals and nutrition support for people experiencing homelessness or crisis. Address: 25 Augusta Ave, Toronto, ON M5T 2K7. Phone: (416) 203-1624. Email: info@stfelixcentre.org"
    },
    {
      name: "Holy Trinity Church – The Common Table",
      url: "https://holytrinity.to/",
      description: "Daily hot meals and community-building with a focus on people who are unhoused. Address: 19 Trinity Square, Toronto, ON M5G 1B1. Phone: (416) 598-4521. Email: info@holytrinity.to"
    },
    {
      name: "Jane/Finch Community and Family Centre – Food Access",
      url: "https://janefinchcentre.org/",
      description: "Emergency food bank, urban agriculture, and nutrition support for low-income families. Address: 4400 Jane St, Toronto, ON M3N 2K4. Phone: (416) 663-2733. Email: info@janefinchcentre.org"
    },
    {
      name: "Scarborough Food Security Initiative",
      url: "https://sfsinitiative.ca/",
      description: "Collaborates with community orgs to deliver culturally relevant food hampers across Scarborough. Address: 5800 Ambler Dr, Mississauga, ON (distribution site; multiple partners in Scarborough). Email: admin@sfsinitiative.ca"
    },
    {
      name: "Weston King Neighbourhood Centre",
      url: "https://wknc.ca/",
      description: "Serves hot meals and groceries to residents in Weston and Mount Dennis neighborhoods. Address: 2017 Weston Rd, Toronto, ON M9N 1X2. Phone: (416) 241-9898. Email: info@wknc.ca"
    },
    {
      name: "Daily Bread Food Bank",
      url: "https://dailybread.ca/",
      description: "Food distribution, research, advocacy, and support to 200+ food programs across Toronto. Address: 191 New Toronto St, Toronto, ON M8V 2E7. Phone: (416) 203-0050. Email: info@dailybread.ca"
    },
    {
      name: "Second Harvest",
      url: "https://secondharvest.ca/",
      description: "Canada's largest food rescue organization, supplying surplus food to nonprofits. Address: 120 The East Mall, Toronto, ON M8Z 5V5. Phone: (416) 408-2594. Email: info@secondharvest.ca"
    },
    {
      name: "North York Harvest Food Bank",
      url: "https://northyorkharvest.com/",
      description: "Emergency food programs and advocacy to reduce food insecurity in North York. Address: 116 Industry St, Toronto, ON M6M 4L8. Phone: (416) 635-7771. Email: info@northyorkharvest.com"
    },
    {
      name: "Toronto Urban Growers",
      url: "https://torontourbangrowers.org/",
      description: "Promotes urban agriculture through networking, advocacy, and education. Address: 40 Orchard View Blvd, Toronto, ON M4R 1B9 (Mailing only). Email: info@torontourbangrowers.org"
    },
    {
      name: "The Stop Community Food Centre",
      url: "https://thestop.org/",
      description: "Combines food access with community-building and social justice. Address: 1884 Davenport Rd, Toronto, ON M6N 4Y2. Phone: (416) 652-7867. Email: general@thestop.org"
    },
    {
      name: "Black Creek Community Farm",
      url: "https://blackcreekfarm.ca/",
      description: "Urban farm offering community food growing, markets, and youth education. Address: 4929 Jane St, Toronto, ON M3N 2K8. Phone: (416) 393-6381. Email: info@blackcreekfarm.ca"
    },
    {
      name: "FoodShare Toronto",
      url: "https://foodshare.net/",
      description: "Equitable food access through markets, advocacy, and school programs. Address: 120 Industry St, Unit C, Toronto, ON M6M 4L8. Phone: (416) 363-6441. Email: info@foodshare.net"
    },
    {
      name: "Regent Park Community Food Centre",
      url: "https://crcchog.org/",
      description: "Food access, meal programs, and advocacy led by CRC (Christian Resource Centre). Address: 40 Oak St, Toronto, ON M5A 2C6. Phone: (416) 364-2261. Email: info@crcchog.org"
    },
    {
      name: "Malvern Family Resource Centre – Food Security Program",
      url: "https://mfrc.org/",
      description: "Emergency food hampers and nutrition services for vulnerable families. Address: 1371 Neilson Rd, Unit 219, Scarborough, ON M1B 4Z8. Phone: (416) 284-4184. Email: info@mfrc.org"
    },
    {
      name: "Parkdale Community Food Bank",
      url: "https://pcfb.ca/",
      description: "Low-barrier food access in west-end Toronto with a focus on dignity and community care. Address: 263 Dunn Ave, Toronto, ON M6K 2S2. Phone: (416) 532-2375. Email: info@pcfb.ca"
    }
  ],
  "Environment & Sustainability": [
    {
      name: "Toronto Environmental Alliance (TEA)",
      url: "https://torontoenvironment.org/",
      description: "Advocates for a greener Toronto through policy research, community organizing, and environmental justice campaigns. Address: 30 Duncan St, Suite 403, Toronto, ON M5V 2C3. Phone: (416) 596-0660. Email: contact@torontoenvironment.org"
    },
    {
      name: "Evergreen",
      url: "https://evergreen.ca/",
      description: "Connects people, natural spaces, and city planning through sustainable urban design and ecology projects. Address: Evergreen Brick Works, 550 Bayview Ave, Toronto, ON M4W 3X8. Phone: (416) 596-1495. Email: info@evergreen.ca"
    },
    {
      name: "Environmental Defence Canada",
      url: "https://environmentaldefence.ca/",
      description: "National advocacy organization tackling climate, toxics, water, plastic pollution, and green economy issues. Address: 40 St. Clair Ave W, Suite 300, Toronto, ON M4V 1M2. Phone: (416) 323-9521. Email: info@environmentaldefence.ca"
    },
    {
      name: "Ontario Nature",
      url: "https://ontarionature.org/",
      description: "Protects wild species and spaces through conservation, education, and community science. Address: 720 Bathurst St, Toronto, ON M5S 2R4. Phone: (416) 444-8419. Email: info@ontarionature.org"
    },
    {
      name: "Park People",
      url: "https://parkpeople.ca/",
      description: "Supports community park groups and city partnerships to create vibrant, accessible public spaces. Address: 401 Richmond St W, Studio 119, Toronto, ON M5V 3A8. Phone: (416) 583-5776. Email: info@parkpeople.ca"
    },
    {
      name: "EcoSpark",
      url: "https://ecospark.ca/",
      description: "Empowers communities and youth to protect their local environment through citizen science and education. Address: 718 The Queensway, Suite 204, Toronto, ON M8Y 1L3. Phone: (416) 805-4914. Email: info@ecospark.ca"
    },
    {
      name: "Greenpeace Canada",
      url: "https://greenpeace.org/canada/",
      description: "Uses non-violent direct action to challenge environmental destruction and promote climate justice globally and locally. Address: 33 Cecil St, Toronto, ON M5T 1N1. Phone: (416) 597-8408. Email: info@greenpeace.ca"
    },
    {
      name: "Toronto Field Naturalists",
      url: "https://torontofieldnaturalists.org/",
      description: "Promotes the study, enjoyment, and conservation of nature in Toronto through walks, lectures, and advocacy. Address: 2-63 Queen St W, Box 71694, Toronto, ON M5H 3M6. Phone: (416) 593-2656. Email: info@torontofieldnaturalists.org"
    },
    {
      name: "LEAF (Local Enhancement and Appreciation of Forests)",
      url: "https://yourleaf.org/",
      description: "Protects and grows Toronto's urban forest through tree planting, education, and community forestry. Address: 601 Christie St, Suite 253, Toronto, ON M6G 4C7. Phone: (416) 413-9244. Email: info@yourleaf.org"
    },
    {
      name: "Cycle Toronto",
      url: "https://cycleto.ca/",
      description: "Promotes cycling as a safe, sustainable mode of transportation through advocacy, education, and civic engagement. Address: 192 Spadina Ave, Suite 215, Toronto, ON M5T 2C2. Phone: (416) 644-7188. Email: info@cycleto.ca"
    },
    {
      name: "Toronto Nature Stewards",
      url: "https://torontonaturestewards.org/",
      description: "Trains and supports volunteer stewards to restore Toronto's ravines and natural areas in collaboration with the city. Citywide (no central office). Email: info@torontonaturestewards.org"
    },
    {
      name: "EcoSchools Canada",
      url: "https://ecoschools.ca/",
      description: "Certifies K–12 schools in environmental education and action to build sustainability leadership across Canada. Address: 215 Spadina Ave, Suite 100, Toronto, ON M5T 2C7. Phone: (416) 642-5774. Email: info@ecoschools.ca"
    },
    {
      name: "Stop Plastics",
      url: "https://stopplastics.ca/",
      description: "Volunteer group focused on eliminating single-use plastics through education, lobbying, and community cleanups. Based in Etobicoke/Lakeshore. Email: info@stopplastics.ca"
    },
    {
      name: "Friends of the Rouge Watershed",
      url: "https://frw.ca/",
      description: "Works to protect and restore the Rouge River ecosystem through tree planting, habitat stewardship, and youth programs. Address: 225 Confederation Dr, Unit 1, Scarborough, ON M1G 1B2. Phone: (416) 208-9870. Email: info@frw.ca"
    },
    {
      name: "Toronto Climate Action Network (TCAN)",
      url: "https://torontoclimatenetwork.org/",
      description: "A network of community-based climate groups collaborating on local action, advocacy, and city climate policy. Citywide network (no central office). Email: info@torontoclimatenetwork.org"
    },
    {
      name: "Not Far From The Tree",
      url: "https://notfarfromthetree.org/",
      description: "Harvests fruit from Toronto's private trees and shares it among homeowners, volunteers, and local charities. Address: 601 Christie St, Suite 253, Toronto, ON M6G 4C7. Phone: (647) 933-7707. Email: info@notfarfromthetree.org"
    },
    {
      name: "Friends of the Don East (FODE)",
      url: "https://fode.ca/",
      description: "Community stewardship group restoring the Don River Valley and advocating for naturalization and sustainable trails. Address: P.O. Box 65122, RPO Chester, Toronto, ON M4K 3Z2. Email: info@fode.ca"
    },
    {
      name: "Sketch Working Arts – Eco Arts Program",
      url: "https://sketch.ca/",
      description: "Supports homeless and marginalized youth in creating eco-conscious art, including reuse and environmental storytelling. Address: 180 Shaw St, Suite 201, Toronto, ON M6J 2W5. Phone: (416) 516-1559. Email: info@sketch.ca"
    },
    {
      name: "High Park Nature Centre",
      url: "https://highparknaturecentre.com/",
      description: "Educates the public about urban ecology, stewardship, and Indigenous knowledge in Toronto's High Park. Address: 375 Colborne Lodge Dr, Toronto, ON M6R 2Z3. Phone: (416) 392-1748. Email: naturecentre@highpark.org"
    },
    {
      name: "Regent Park Community Garden",
      url: "https://regentparkgarden.ca/",
      description: "Supports sustainable growing, community food sharing, and green space access for residents of Regent Park. Address: 620 Dundas St E, Toronto, ON M5A 3S4. Email: info@regentparkgarden.ca"
    },
    {
      name: "David Suzuki Foundation",
      url: "https://davidsuzuki.org/",
      description: "Works to protect nature, tackle climate change, and create a sustainable future through science, advocacy, and education. Address: 130 Spadina Ave, Suite 301, Toronto, ON M5V 2L4. Phone: (416) 861-1237. Email: contact@davidsuzuki.org"
    },
    {
      name: "Regenesis (York University Chapter)",
      url: "https://regenesis.eco/",
      description: "Student-led environmental and social justice group supporting zero waste, free markets, and sustainable transportation. Address: 4700 Keele St, Toronto, ON M3J 1P3 (York U Student Centre). Phone: (647) 560-4785. Email: york@regenesis.eco"
    },
    {
      name: "Toronto Urban Growers (TUG)",
      url: "https://torontourbangrowers.org/",
      description: "Network that promotes urban agriculture in Toronto through policy, community projects, and food justice. Address: Based at Daniels Spectrum, 585 Dundas St E, Toronto, ON M5A 2B7. Email: info@torontourbangrowers.org"
    },
    {
      name: "Transition Toronto",
      url: "https://transitiontoronto.org/",
      description: "Local chapter of the global Transition Network, working to build resilience and sustainability at the neighborhood level. Virtual/Citywide. Email: info@transitiontoronto.org"
    },
    {
      name: "Live Green Toronto",
      url: "https://livegreentoronto.ca/",
      description: "Municipal program supporting residents, businesses, and communities to take climate action and live sustainably. Address: City Hall, 100 Queen St W, Toronto, ON M5H 2N2. Phone: 311 (within Toronto). Email: livegreen@toronto.ca"
    },
    {
      name: "Building Roots",
      url: "https://buildingroots.ca/",
      description: "Creates dynamic urban agriculture and food spaces in underserved communities, including the Moss Park shipping container market. Address: 260 Queen St E, Toronto, ON M5A 1S6. Email: info@buildingroots.ca"
    },
    {
      name: "Second Harvest – Environmental Impact Program",
      url: "https://secondharvest.ca/",
      description: "Canada's largest food rescue organization — reduces food waste and GHGs by redirecting surplus food to those in need. Address: 120 The East Mall, Toronto, ON M8Z 5V5. Phone: (416) 408-2594. Email: info@secondharvest.ca"
    },
    {
      name: "Green Neighbours Network of Toronto",
      url: "https://gnntoronto.ca/",
      description: "A grassroots network that connects climate-action groups and environmental advocates across Toronto neighborhoods. Virtual/Citywide. Email: gnn@gnntoronto.ca"
    },
    {
      name: "Friends of Allan Gardens",
      url: "https://friendsofallangardens.ca/",
      description: "Advocates for the preservation and revitalization of Allan Gardens through gardening, education, and community events. Address: 19 Horticultural Ave, Toronto, ON M5A 2P2. Email: info@friendsofallangardens.ca"
    },
    {
      name: "Clean Air Partnership",
      url: "https://cleanairpartnership.org/",
      description: "Supports municipalities in advancing clean air, climate resilience, and sustainable urban planning through research and collaboration. Address: 75 Elizabeth St, Toronto, ON M5G 1P4. Phone: (416) 460-8341. Email: info@cleanairpartnership.org"
    },
    {
      name: "Lake Ontario Waterkeeper (now Swim Drink Fish Canada)",
      url: "https://swimdrinkfish.ca/",
      description: "Protects clean water and promotes public access to swimmable, drinkable, fishable lakes through citizen science and advocacy. Address: 460 Richmond St W, Suite 400, Toronto, ON M5V 1Y1. Phone: (416) 861-1237. Email: info@swimdrinkfish.ca"
    },
    {
      name: "North American Native Plant Society (NANPS)",
      url: "https://nanps.org/",
      description: "Promotes the conservation, cultivation, and restoration of native plants in home gardens and natural areas. Address: P.O. Box 69070, St. Clair P.O., Toronto, ON M4T 3A1. Phone: (416) 631-4438. Email: nanps@nanps.org"
    },
    {
      name: "Seeds of Diversity Canada",
      url: "https://seeds.ca/",
      description: "Protects Canada's seed biodiversity through seed saving, heritage plant preservation, and education. Address: P.O. Box 36, Stn Q, Toronto, ON M4T 2L7. Phone: (519) 827-0829. Email: office@seeds.ca"
    },
    {
      name: "FoodShare Toronto – Urban Agriculture Program",
      url: "https://foodshare.net/",
      description: "Builds food justice by supporting community gardens, school gardens, rooftop growing, and composting programs. Address: 120 Industry St, Unit C, Toronto, ON M6M 4L8. Phone: (416) 363-6441. Email: info@foodshare.net"
    },
    {
      name: "Toronto Green Community",
      url: "https://torontogreen.ca/",
      description: "Runs local greening projects, home energy programs, and community workshops to promote sustainable living. Address: 180 Sudbury St, Unit C3, Toronto, ON M6J 0A8. Phone: (416) 388-7447. Email: info@torontogreen.ca"
    },
    {
      name: "Urban Biodiversity Education and Research (UBER) Group",
      url: "https://uberresearch.org/",
      description: "Conducts ecological research on urban biodiversity to inform local conservation efforts and green planning. Address: University of Toronto Scarborough. Email: info@uberresearch.org"
    },
    {
      name: "Faith & the Common Good – Green Sacred Spaces",
      url: "https://faithcommongood.org/",
      description: "Supports faith communities in greening their buildings, reducing waste, and promoting climate justice. Address: 310 Dupont St, Suite 200, Toronto, ON M5R 1V9. Phone: (647) 382-6309. Email: fgc@faithcommongood.org"
    },
    {
      name: "Environmental Youth Alliance (Toronto chapter partners)",
      url: "https://eya.ca/",
      description: "Connects marginalized youth with nature and environmental justice through community-led learning and leadership. HQ in Vancouver but active in Toronto through partners."
    },
    {
      name: "Green Thumbs Growing Kids",
      url: "https://greenthumbsto.org/",
      description: "Partners with schools and communities to engage children in urban gardening, ecology, and healthy food education. Address: 200 Dundas St E, Suite 300, Toronto, ON M5A 4R6. Phone: (647) 348-5848. Email: info@greenthumbsto.org"
    },
    {
      name: "Jane/Finch Centre – Environmental Justice Program",
      url: "https://janefinchcentre.org/",
      description: "Offers environmental programming that connects sustainability, social equity, and climate resilience in underserved communities. Address: 540 Jane St, Toronto, ON M6N 4A4. Phone: (416) 645-7575. Email: info@janefinchcentre.org"
    }
  ],
  "African & Black Communities": [
    {
      name: "African Community Services of Peel (ACSP)",
      url: "https://www.africancommunityservices.com/",
      description: "Settlement services for African and Caribbean immigrants across GTA. Address: 20 Nelson St W, Brampton, ON L6Y 0A5. Phone: (905) 451-2017. Email: info@acsp.ca"
    },
    {
      name: "Afri-Can FoodBasket",
      url: "https://www.africanfoodbasket.ca/",
      description: "Food security, Black food sovereignty, urban agriculture programs. Address: 120 Industry St, Toronto, ON M6M 4L8. Phone: (416) 704-8055. Email: info@africanfoodbasket.ca"
    },
    {
      name: "Black Health Alliance",
      url: "https://www.blackhealthalliance.ca/",
      description: "Health equity, anti-Black racism, mental health advocacy for Black communities. Address: 1840 Eglinton Ave W, Toronto, ON M6E 2H6. Phone: (416) 661-5397. Email: info@blackhealthalliance.ca"
    },
    {
      name: "African Canadian Social Development Council (ACSDC)",
      url: "https://www.acsdc.ca/",
      description: "Social development, capacity building for African-Canadian communities. Address: 5210 Finch Ave E, Toronto, ON M1T 3J1. Phone: (416) 298-7885. Email: info@acsdc.ca"
    },
    {
      name: "Tropicana Community Services",
      url: "https://www.tropicanacommunity.org/",
      description: "Youth, employment, education, and settlement services with a Caribbean/African focus. Address: 1385 Huntingwood Dr, Toronto, ON M1W 2S5. Phone: (416) 439-9009. Email: info@tropicanacommunity.org"
    },
    {
      name: "Black Coalition for AIDS Prevention (Black CAP)",
      url: "https://www.blackcap.ca/",
      description: "HIV/AIDS education and support for Black, African, and Caribbean communities. Address: 20 Victoria St, Toronto, ON M5C 2N8. Phone: (416) 977-9955. Email: info@blackcap.ca"
    },
    {
      name: "Women's Health in Women's Hands CHC",
      url: "https://www.whiwhchc.ca/",
      description: "Health services for Black and racialized women. Address: 2 Carlton St, Suite 500, Toronto, ON M5B 1J3. Phone: (416) 593-0077. Email: info@whiwhchc.ca"
    },
    {
      name: "TAIBU Community Health Centre",
      url: "https://www.taibuchc.ca/",
      description: "Primary healthcare for Black populations. Address: 27 Tapscott Rd, Toronto, ON M1B 1Y7. Phone: (416) 644-1876. Email: info@taibuchc.ca"
    },
    {
      name: "Black Legal Action Centre (BLAC)",
      url: "https://www.blacklegalactioncentre.ca/",
      description: "Legal aid and advocacy for low- or no-income Black Ontarians. Address: 720 Spadina Ave, Suite 300, Toronto, ON M5S 2T9. Phone: (416) 597-5831. Email: info@blacklegalactioncentre.ca"
    },
    {
      name: "Young Potential Financiers (YPF)",
      url: "https://www.youngpotentialfinanciers.com/",
      description: "Financial literacy for Black and African youth. Virtual Toronto-based initiatives. Phone: (416) 925-4477. Email: info@youngpotentialfinanciers.com"
    },
    {
      name: "Canadian Centre for Victims of Torture (CCVT)",
      url: "https://www.ccvt.org/",
      description: "Settlement, trauma support for refugees and torture survivors, including from African nations. Address: 194 Jarvis St, Toronto, ON M5B 2B7. Phone: (416) 363-1066. Email: info@ccvt.org"
    },
    {
      name: "Rexdale Women's Centre",
      url: "https://www.rexdalewomen.org/",
      description: "Services for immigrant women and families, including African communities. Address: 925 Albion Rd, Toronto, ON M9V 1A6. Phone: (416) 741-4357. Email: info@rexdalewomen.org"
    },
    {
      name: "African Women's Alliance of Ontario (AWAO)",
      url: "https://www.awao.org/",
      description: "Support for African women and girls, including legal aid, housing, and violence prevention. Based in Toronto (community-run). Phone: (416) 533-8545. Email: info@awao.org"
    },
    {
      name: "Ubuntu Learning and Community Centre",
      url: "https://www.ubuntu.ca/",
      description: "Education and empowerment for African immigrants and youth. Toronto-based mobile programming. Phone: (416) 925-5677. Email: info@ubuntu.ca"
    },
    {
      name: "Generation Chosen",
      url: "https://www.generationchosen.ca/",
      description: "Mental health, emotional intelligence for racialized youth (many of African descent). Address: 40 Tuxedo Ct, Toronto, ON M3J 2A5. Phone: (416) 736-5207. Email: info@generationchosen.ca"
    },
    {
      name: "SEED Toronto (Supporting Education, Empowerment & Development)",
      url: "https://www.seedtoronto.com/",
      description: "Mentorship for Black and African youth, financial empowerment. Community programming across the GTA. Phone: (416) 298-4471. Email: info@seedtoronto.com"
    },
    {
      name: "Africa Rising International Film Festival",
      url: "https://www.africarising.tv/",
      description: "Showcases African stories and filmmakers in Canada. Toronto events & venues. Phone: (416) 532-8834. Email: info@africarising.tv"
    },
    {
      name: "Black Women in Motion",
      url: "https://www.blackwomeninmotion.org/",
      description: "Leadership and empowerment for Black and African-descendant women and youth. Address: 215 Spadina Ave, Toronto, ON M5T 2C7. Phone: (416) 925-7742. Email: info@blackwomeninmotion.org"
    },
    {
      name: "Africa Inland Mission Canada (AIM)",
      url: "https://www.aimint.org/",
      description: "Community outreach and partnership with African diaspora faith groups. Regional office in Toronto. Phone: (416) 751-6077. Email: info@aimint.org"
    },
    {
      name: "Midaynta Community Services",
      url: "https://www.midaynta.com/",
      description: "Somali and East African newcomer services, youth programs, and housing help. Address: 121 Kendleton Dr, Toronto, ON M9A 4X4. Phone: (416) 743-3270. Email: info@midaynta.com"
    },
    {
      name: "Nia Centre for the Arts",
      url: "https://www.niacentre.org/",
      description: "Supports and showcases Afro-diasporic art, culture, and artists. Address: 524 Oakwood Ave, Toronto, ON M6E 2W3. Phone: (416) 654-5460. Email: info@niacentre.org"
    },
    {
      name: "Dixon Hall Neighbourhood Services",
      url: "https://www.dixonhall.org/",
      description: "Provides services in high-needs areas like Regent Park, where many African newcomer families live. Address: 58 Sumach St, Toronto, ON M5A 3J7. Phone: (416) 863-0499. Email: info@dixonhall.org"
    },
    {
      name: "Delta Family Resource Centre",
      url: "https://www.dfrc.ca/",
      description: "Supports Black and African immigrant families in northwest Toronto. Address: 1280 Finch Ave W, Toronto, ON M3J 3K6. Phone: (416) 663-4978. Email: info@dfrc.ca"
    },
    {
      name: "Black Youth Helpline",
      url: "https://www.blackyouth.ca/",
      description: "Prevention-focused helpline and advocacy for Black youth, including African newcomers. Address: 185 Somerset St W, Toronto, ON M5V 0A6. Phone: (416) 285-9944. Email: info@blackyouth.ca"
    },
    {
      name: "Success Beyond Limits",
      url: "https://www.successbl.com/",
      description: "Academic and social support for Black and African-Canadian youth. Based in York/Weston areas of Toronto. Phone: (416) 247-7233. Email: info@successbl.com"
    },
    {
      name: "Kenyan Canadian Association (KCA)",
      url: "https://www.kcacanada.org/",
      description: "Community integration, advocacy, and support for Kenyan and East African immigrants. Greater Toronto Area. Phone: (416) 214-1840. Email: info@kcacanada.org"
    },
    {
      name: "Somali Women's and Children's Support Network (SWCSN)",
      url: "https://www.swcsn.org/",
      description: "Community programming, crisis support, youth and women's empowerment. Scarborough, ON. Phone: (416) 431-7136. Email: info@swcsn.org"
    },
    {
      name: "African Canadian Heritage Association (ACHA)",
      url: "https://www.achaonline.org/",
      description: "Cultural education, youth programs, African heritage preservation. Address: 20 Toronto St, Toronto, ON M5C 2B8. Phone: (416) 925-9701. Email: info@achaonline.org"
    },
    {
      name: "Black Daddies Club",
      url: "https://www.theblackdaddiesclub.com/",
      description: "Advocacy, support, and community building for Black and African fathers. Toronto-wide initiatives. Phone: (416) 832-4477. Email: info@theblackdaddiesclub.com"
    },
    {
      name: "CulturaLink",
      url: "https://www.culturalink.ca/",
      description: "Newcomer and refugee health and settlement support; works closely with African clients. Address: 789 Don Mills Rd, Toronto, ON M3C 1T5. Phone: (416) 463-2444. Email: info@culturalink.ca"
    },
    {
      name: "African Women Acting (AWA)",
      url: "https://www.africanwomenacting.org/",
      description: "Promotes African arts, culture, and women artists. Toronto-based event and program-focused. Phone: (416) 925-4471. Email: info@africanwomenacting.org"
    },
    {
      name: "YAAACE (Youth Association for Academics, Athletics and Character Education)",
      url: "https://www.yaaace.com/",
      description: "Academic, athletic, and leadership programming for racialized youth. Address: 1621 Weston Rd, Toronto, ON M9N 1T9. Phone: (416) 241-7725. Email: info@yaaace.com"
    },
    {
      name: "Ujima House",
      url: "https://www.ujimahouse.ca/",
      description: "Health and wellness programs for African, Caribbean, and Black fathers and families. Address: 1901 Weston Rd, Toronto, ON M9N 1V4. Phone: (416) 247-5171. Email: info@ujimahouse.ca"
    },
    {
      name: "Canadian Multicultural Inventors Museum (CMIM)",
      url: "https://www.cmimuseum.com/",
      description: "Celebrates innovations by African and multicultural inventors. Toronto, ON. Phone: (416) 925-6677. Email: info@cmimuseum.com"
    },
    {
      name: "The Walnut Foundation",
      url: "https://www.thewalnutfoundation.com/",
      description: "Men's health education, specifically targeting Black and African men. Greater Toronto Area. Phone: (416) 588-3201. Email: info@thewalnutfoundation.com"
    },
    {
      name: "Africa Toronto Community Network (ATCN)",
      url: "https://www.africatoronto.ca/",
      description: "African diaspora collaboration and community initiatives. Toronto-wide network. Phone: (416) 925-7834. Email: info@africatoronto.ca"
    },
    {
      name: "Network for the Advancement of Black Communities (NABC)",
      url: "https://www.nabcnet.ca/",
      description: "Capacity-building, research, and support for Black-led organizations. Address: 215 Spadina Ave, Toronto, ON M5T 2C7. Phone: (416) 925-5622. Email: info@nabcnet.ca"
    },
    {
      name: "Canadian Black Chamber of Commerce (CBCC)",
      url: "https://www.blackchamber.ca/",
      description: "Economic empowerment for Black and African entrepreneurs. Address: 3 Concorde Gate, Toronto, ON M3C 3N7. Phone: (416) 504-4097. Email: info@blackchamber.ca"
    },
    {
      name: "Keep6ix",
      url: "https://www.keep6ix.org/",
      description: "Supports at-risk youth, many from African/Caribbean backgrounds, with mentorship and legal aid. Toronto-wide. Phone: (416) 925-7411. Email: info@keep6ix.org"
    },
    {
      name: "Jaku Konbit (Toronto chapter)",
      url: "https://www.jakukonbit.com/",
      description: "Culturally relevant youth and family services rooted in African values. Toronto & Ottawa chapter events and programs. Phone: (416) 588-9044. Email: toronto@jakukonbit.com"
    },
    {
      name: "Black Physicians' Association of Ontario",
      url: "https://www.blackphysicians.ca/",
      description: "Supports Black medical professionals and addresses health disparities among Black Ontarians. Toronto-based. Phone: (416) 925-8877. Email: info@blackphysicians.ca"
    },
    {
      name: "The Most Nurtured",
      url: "https://www.themostnurtured.com/",
      description: "Holistic wellness programs for Black womxn/non-binary individuals across Toronto. Phone: (416) 588-2233. Email: info@themostnurtured.com"
    },
    {
      name: "African Canadian Civic Engagement Council",
      url: "https://www.accec.ca/",
      description: "Advocates for civic participation and addresses systemic inequity. Toronto-based. Phone: (416) 925-7799. Email: info@accec.ca"
    },
    {
      name: "Canadian-African Newcomer Aid Centre of Toronto (CANACT)",
      url: "https://www.canact.org/",
      description: "Supports African refugees and immigrants with integration and settlement services. Toronto-based. Phone: (416) 532-9988. Email: info@canact.org"
    },
    {
      name: "African Community Health Services",
      url: "https://www.achs.ca/",
      description: "Health supports targeted toward African immigrant communities in downtown Toronto. Phone: (416) 925-6644. Email: info@achs.ca"
    },
    {
      name: "African Women Resource and Information Centre",
      url: "https://www.awric.ca/",
      description: "Support services and resources for African women in Toronto. Phone: (416) 588-3311. Email: info@awric.ca"
    },
    {
      name: "Eritrean Cultural and Civic Centre",
      url: "https://www.eritreancultural.ca/",
      description: "Offers heritage programs, newcomer supports, and community events for Eritrean-Canadians. Toronto-based. Phone: (416) 925-5544. Email: info@eritreancultural.ca"
    },
    {
      name: "Eritrean Relief Association of Canada",
      url: "https://www.eritreanrelief.ca/",
      description: "A network supporting Eritrean newcomers via education and community development. Toronto chapter. Phone: (416) 532-7788. Email: info@eritreanrelief.ca"
    },
    {
      name: "Eritrean Canadian Community Centre",
      url: "https://www.eritreancanadian.ca/",
      description: "Settlement and cultural services for the Eritrean diaspora in Toronto. Phone: (416) 925-3322. Email: info@eritreancanadian.ca"
    },
    {
      name: "Ethiopian Association in Toronto",
      url: "https://www.ethiopianassociation.ca/",
      description: "Supports Ethiopian newcomers with integration, sports, and heritage programming. Address: 1200 Markham Rd, Suite 200, Toronto, ON M1H 3C3. Phone: (416) 439-5881. Email: info@ethiopianassociation.ca"
    },
    {
      name: "Little Black Afro Theatre Company",
      url: "https://www.littleblackafro.com/",
      description: "Theatre company promoting Black stories, community outreach, and artist support. Toronto-based. Phone: (416) 588-9955. Email: info@littleblackafro.com"
    },
    {
      name: "Black Creek Community Farm",
      url: "https://www.blackcreekfarm.ca/",
      description: "Food literacy and security programming serving Black and racialized communities. Toronto-based. Phone: (416) 925-4488. Email: info@blackcreekfarm.ca"
    },
    {
      name: "Roots Community Services Inc.",
      url: "https://www.rootscommunity.ca/",
      description: "Youth mentorship, substance abuse support, and leadership development for Black youth. Toronto-based. Phone: (416) 532-6677. Email: info@rootscommunity.ca"
    },
    {
      name: "Parents of Black Children (PoBC)",
      url: "https://www.parentsofblackchildren.ca/",
      description: "Advocacy, Africentric education platform, and mental health resources for Black families. Toronto-based. Phone: (416) 925-7744. Email: info@parentsofblackchildren.ca"
    },
    {
      name: "Harriet Tubman Community Organization",
      url: "https://www.harriettubman.ca/",
      description: "Youth-focused development programs using culturally relevant and strength-based approaches. Toronto-based. Phone: (416) 588-5533. Email: info@harriettubman.ca"
    },
    {
      name: "Freedom School Toronto",
      url: "https://www.freedomschool.ca/",
      description: "Africentric education programming for Black children to combat anti-Black racism in schools. Toronto-based. Phone: (416) 925-8866. Email: info@freedomschool.ca"
    },
    {
      name: "Black Youth Initiative",
      url: "https://www.blackyouthinitiative.ca/",
      description: "Peer-led mutual aid and support services for Black and Indigenous youth in Toronto. Phone: (416) 532-2244. Email: info@blackyouthinitiative.ca"
    },
    {
      name: "Black Lives Matter–Toronto",
      url: "https://www.blacklivesmatter.ca/",
      description: "Advocacy coalition dismantling systemic anti-Black racism and institutional violence. Toronto-based. Phone: (416) 925-1122. Email: info@blacklivesmatter.ca"
    },
    {
      name: "Federation of Black Canadians",
      url: "https://www.blackcanadians.ca/",
      description: "National advocacy network advancing African-Canadian social, economic, and political interests. Toronto chapter. Phone: (416) 588-7799. Email: info@blackcanadians.ca"
    },
    {
      name: "Nigerian Canadian Association (NCA GTA)",
      url: "https://www.nigeriancanadian.ca/",
      description: "Supports Nigerian immigrants through cultural, social, and development programming. Greater Toronto Area. Phone: (416) 925-3355. Email: info@nigeriancanadian.ca"
    }
  ],
  "Ghana & Ghanaian Communities": [
    {
      name: "Ghanaian Canadian Association of Ontario (GCAO)",
      url: "https://gcaocanada.org/",
      description: "Enhances living standards of Ghanaian-Canadians through social, cultural, and educational programs. Supports over 20,000 Ghanaian-Canadians in the GTA. Address: 65 Mayall Ave, North York, ON M3L 1E7. Email: info@gcaocanada.org"
    },
    {
      name: "Ghanaian Canadian Chamber of Commerce (GCCC)",
      url: "https://canadagcc.ca/",
      description: "Promotes business, trade, tourism, and investment between Canada and Ghana. Offers mentorship, networking, and free advertising for Ghanaian-Canadian entrepreneurs. Address: 65 Mayall Ave, North York, ON M3L 1E7. Email: info@canadagcc.ca"
    },
    {
      name: "Ghanaian Women's Association of Ontario (GWAO)",
      url: "https://gcaocanada.org/",
      description: "Empowers Ghanaian women and families in Ontario through community support and cultural preservation. Organizes women's empowerment events, cultural programs, and settlement services in the GTA. Email: info@gcaocanada.org"
    },
    {
      name: "Ghanaian Canadian Youth Association (GCYA)",
      url: "https://gcaocanada.org/",
      description: "Empowers Ghanaian-Canadian youth in Ontario through education and mentorship. Organizes leadership workshops, scholarships, and cultural events in the GTA. Email: info@gcaocanada.org"
    },
    {
      name: "Ghanaian Canadian Professionals and Entrepreneurs Association (GCPEA)",
      url: "https://gcaocanada.org/",
      description: "Supports Ghanaian-Canadian professionals and entrepreneurs through networking and mentorship. Organizes career workshops and business networking events in the GTA. Email: info@gcaocanada.org"
    },
    {
      name: "Ghanaian Canadian Multicultural Community Centre (GCMCC)",
      url: "https://gcaocanada.org/",
      description: "Supports Ghanaian-Canadians through cultural, educational, and social programs. Offers youth mentorship, cultural festivals, and settlement services in the GTA. Email: info@gcaocanada.org"
    },
    {
      name: "Canadian Physicians for Aid and Relief (CPAR)",
      url: "https://www.cpar.ca/",
      description: "Supports health and sustainable development in Ghana, focusing on maternal and child health. Implements health programs and clean water initiatives. Address: 401 Richmond St W, Suite 365, Toronto, ON M5V 3A8. Phone: (416) 369-0865. Email: info@cpar.ca"
    },
    {
      name: "Plan International Canada – Ontario Office",
      url: "https://plancanada.ca/",
      description: "Advances children's rights and gender equality in Ghana through education and health programs. Supports girls' education and community development. Address: 245 Eglinton Ave E, Suite 300, Toronto, ON M4P 0B3. Phone: (800) 387-1418. Email: info@plancanada.ca"
    },
    {
      name: "Right To Play – Ontario Office",
      url: "https://www.righttoplay.ca/",
      description: "Uses play-based learning to empower Ghanaian children through education and life skills. Implements school programs promoting education and gender equality. Address: 18 King St E, Suite 800, Toronto, ON M5C 1C4. Phone: (416) 498-1922. Email: info@righttoplay.ca"
    },
    {
      name: "Engineers Without Borders Canada – Ontario Chapter",
      url: "https://www.ewb.ca/",
      description: "Supports sustainable development in Ghana through technology and entrepreneurship. Promotes agricultural innovation and youth entrepreneurship. Address: 200-2464 Bloor St W, Toronto, ON M6S 1P7. Phone: (416) 481-3696. Email: info@ewb.ca"
    },
    {
      name: "Free The Children (WE Charity) – Ontario Office",
      url: "https://www.we.org/",
      description: "Supports education and community development in Ghana, focusing on youth empowerment. Builds schools and provides clean water. Address: 225 Carlton St, Toronto, ON M5A 2L2. Phone: (416) 925-5894. Email: info@we.org"
    },
    {
      name: "Africans in Partnership Against AIDS (APAA)",
      url: "https://www.apaa.ca/",
      description: "Supports Ghanaian and African communities in Ontario with HIV/AIDS education, with outreach to Ghana. Provides health workshops, support groups, and advocacy for Ghanaian-Canadians. Address: 517 College St, Suite 235, Toronto, ON M6G 4A2. Phone: (416) 924-5256. Email: info@apaa.ca"
    },
    {
      name: "Action Against Hunger Canada – Ontario Office",
      url: "https://actionagainsthunger.ca/",
      description: "Addresses malnutrition and food insecurity in Ghana's northern regions. Implements nutrition and water access projects. Address: 720 Bathurst St, Toronto, ON M5S 2R4. Phone: (416) 644-1016. Email: info@actionagainsthunger.ca"
    },
    {
      name: "World Vision Canada – Ontario Office",
      url: "https://www.worldvision.ca/",
      description: "Supports child welfare, education, and health in Ghana through community development. Funds clean water, education, and nutrition projects. Address: 1 World Dr, Mississauga, ON L5T 2Y4. Phone: (800) 844-7993. Email: info@worldvision.ca"
    },
    {
      name: "Crossroads International – Ontario Office",
      url: "https://www.cintl.org/",
      description: "Promotes women's rights and economic empowerment in Ghana through volunteer programs. Supports women's cooperatives and gender equality. Address: 49 Bathurst St, Suite 201, Toronto, ON M5V 2P2. Phone: (416) 967-1611. Email: info@cintl.org"
    },
    {
      name: "Save the Mothers – Ontario Office",
      url: "https://www.savethemothers.org/",
      description: "Improves maternal health in Ghana through training and education programs. Trains healthcare workers and supports maternal care. Address: 27 Legend Ct, P.O. Box 10126, Ancaster, ON L9K 1P4. Phone: (905) 648-9212. Email: info@savethemothers.org"
    },
    {
      name: "Canadian Feed The Children – Ontario Office",
      url: "https://canadianfeedthechildren.ca/",
      description: "Supports child nutrition and education in Ghana's rural communities. Partners with Ghanaian NGOs for school feeding and agricultural training. Address: 901-2 Lansing Square, Toronto, ON M2J 4P8. Phone: (416) 757-1220. Email: info@canadianfeedthechildren.ca"
    },
    {
      name: "WUSC (World University Service of Canada) – Ontario Office",
      url: "https://wusc.ca/",
      description: "Promotes education and economic opportunities for Ghanaian youth, especially women. Provides scholarships and vocational training. Address: 1404 Scott St, Ottawa, ON K1Y 4M8. Phone: (613) 798-7477. Email: info@wusc.ca"
    },
    {
      name: "Care Canada – Ontario Office",
      url: "https://care.ca/",
      description: "Supports women's empowerment and health programs in Ghana, focusing on maternal health. Implements gender-focused health projects. Address: 9 Gurdwara Rd, Suite 200, Ottawa, ON K2E 7X6. Phone: (800) 267-5232. Email: info@care.ca"
    },
    {
      name: "Operation Eyesight Universal – Ontario Office",
      url: "https://operationeyesight.com/",
      description: "Improves eye health in Ghana through community-based vision care programs. Funds eye clinics and training. Address: 20 Adelaide St E, Suite 200, Toronto, ON M5C 2T6. Phone: (800) 585-8265. Email: info@operationeyesight.com"
    },
    {
      name: "Aga Khan Foundation Canada – Ontario Office",
      url: "https://www.akfc.ca/",
      description: "Supports education and economic development in Ghana's rural areas. Funds community schools and agricultural cooperatives. Address: 199 Sussex Dr, Ottawa, ON K1N 1K6. Phone: (613) 237-2532. Email: info@akfc.ca"
    },
    {
      name: "Children Believe – Ontario Office",
      url: "https://childrenbelieve.ca/",
      description: "Supports education and child protection in Ghana's marginalized communities. Funds school programs and child sponsorships. Address: 1200 Denison St, Markham, ON L3R 8G6. Phone: (800) 387-1418. Email: info@childrenbelieve.ca"
    },
    {
      name: "CAMFED Canada – Ontario Office",
      url: "https://camfed.org/",
      description: "Promotes girls' education in Ghana through scholarships and community support. Supports secondary education for girls in rural Ghana. Based in Toronto. Email: canada@camfed.org"
    },
    {
      name: "SOS Children's Villages Canada – Ontario Office",
      url: "https://www.soschildrensvillages.ca/",
      description: "Supports orphaned and vulnerable children in Ghana through family-based care. Funds children's villages in Ghana (Tamale, Kumasi). Address: 44 By Ward Market Square, Suite 204, Ottawa, ON K1N 7A2. Phone: (613) 232-3309. Email: info@soschildrensvillages.ca"
    },
    {
      name: "The Hunger Project Canada – Ontario Office",
      url: "https://thp.org/",
      description: "Addresses hunger and poverty in Ghana through community-led development. Supports epicenter programs for food security and women's empowerment. Based in Toronto. Email: info@thp.org"
    },
    {
      name: "War Child Canada – Ontario Office",
      url: "https://www.warchild.ca/",
      description: "Supports education and protection for children in Ghana affected by poverty. Funds community-based education and psychosocial support. Address: 67 Mowat Ave, Suite 414, Toronto, ON M6K 3E3. Phone: (416) 971-7474. Email: info@warchild.ca"
    },
    {
      name: "WaterAid Canada – Ontario Office",
      url: "https://www.wateraid.org/ca/",
      description: "Improves access to clean water and sanitation in Ghana's rural communities. Funds water and hygiene projects. Address: 321 Chapel St, Ottawa, ON K1N 7Z2. Phone: (613) 230-5182. Email: info@wateraidcanada.org"
    },
    {
      name: "Youth Challenge International – Ontario Office",
      url: "https://yci.org/",
      description: "Empowers Ghanaian youth through skills training and entrepreneurship programs. Runs youth employment and leadership programs. Address: 3044 Bloor St W, Suite 972, Toronto, ON M8X 2Y8. Email: info@yci.org"
    },
    {
      name: "CODE (Canadian Organization for Development through Education)",
      url: "https://code.ngo/",
      description: "Advances literacy and education in Ghana, particularly for girls. Supports teacher training and reading programs. Address: 321 Chapel St, Ottawa, ON K1N 7Z2. Phone: (613) 241-2633. Email: info@code.ngo"
    },
    {
      name: "ChildFund Canada – Ontario Office",
      url: "https://childfund.ca/",
      description: "Supports child education and protection in Ghana through community programs. Funds school infrastructure and child sponsorships. Address: 2600 Skymark Ave, Unit 4-101, Mississauga, ON L4W 5B2. Phone: (800) 387-1418. Email: info@childfund.ca"
    },
    {
      name: "Farm Radio International – Ontario Office",
      url: "https://farmradio.org/",
      description: "Supports rural Ghanaian communities through radio-based agricultural education. Delivers radio programs to Ghanaian farmers. Address: 1404 Scott St, Ottawa, ON K1Y 4M8. Phone: (613) 761-3650. Email: info@farmradio.org"
    },
    {
      name: "VSO Canada (Voluntary Service Overseas) – Ontario Office",
      url: "https://vsocanada.org/",
      description: "Promotes education and health in Ghana through volunteer-driven programs. Sends volunteers to support teacher training and health initiatives. Address: 44 Eccles St, Suite 100, Ottawa, ON K1R 6S4. Phone: (613) 234-1364. Email: info@vsocanada.org"
    },
    {
      name: "Ghana Rural Integrated Development (GRID)",
      url: "https://grid-nea.org/",
      description: "Supports sustainable development in rural Ghana, focusing on health, education, and economic empowerment. Builds schools, provides clean water, and supports agriculture in Northern Ghana. Based in Milton, Ontario. Email: info@grid-nea.org"
    },
    {
      name: "Ghana Medical Help",
      url: "https://ghanamedicalhelp.com/",
      description: "Improves healthcare access in rural Ghana, particularly in the Upper West Region. Supplies medical equipment and training to Ghanaian hospitals. Based in Ontario. Email: info@ghanamedicalhelp.com"
    },
    {
      name: "The Afri-Can Education and Support Fund",
      url: "https://www.afri-canedusupport.org/",
      description: "Supports education for Ghanaian children and youth in rural areas. Funds school supplies, teacher training, and infrastructure with Ontario-based fundraising. Based in Toronto. Email: info@afri-canedusupport.org"
    }
  ]

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
  const [expandedTorontoNonprofitCategories, setExpandedTorontoNonprofitCategories] = useState<string[]>([]);
  const [selectedTorontoNonprofitFilter, setSelectedTorontoNonprofitFilter] = useState<string>("all");
  const [subcategoryFilters, setSubcategoryFilters] = useState<{[key: string]: string}>({});

  // Helper function to generate tags for organizations
  const generateTags = (name: string, description: string): string[] => {
    const tags: string[] = [];
    const text = (name + ' ' + description).toLowerCase();
    
    // Service type tags
    if (text.includes('employment') || text.includes('job') || text.includes('career') || text.includes('work')) tags.push('Employment');
    if (text.includes('settlement') || text.includes('newcomer') || text.includes('immigrant') || text.includes('refugee')) tags.push('Settlement');
    if (text.includes('language') || text.includes('english') || text.includes('esl') || text.includes('linc')) tags.push('Language');
    if (text.includes('youth') || text.includes('young') || text.includes('children')) tags.push('Youth');
    if (text.includes('lgbtq') || text.includes('lgbt') || text.includes('gay') || text.includes('lesbian') || text.includes('trans') || text.includes('queer')) tags.push('LGBTQ+');
    if (text.includes('women') || text.includes('woman') || text.includes('female')) tags.push('Women');
    if (text.includes('mental health') || text.includes('counselling') || text.includes('therapy')) tags.push('Mental Health');
    if (text.includes('housing') || text.includes('shelter') || text.includes('homeless')) tags.push('Housing');
    if (text.includes('food') || text.includes('meal') || text.includes('kitchen') || text.includes('nutrition')) tags.push('Food');
    if (text.includes('health') || text.includes('medical') || text.includes('clinic')) tags.push('Health');
    if (text.includes('training') || text.includes('education') || text.includes('skill')) tags.push('Training');
    if (text.includes('community') || text.includes('social')) tags.push('Community');
    if (text.includes('legal') || text.includes('law') || text.includes('advocacy')) tags.push('Legal');
    if (text.includes('senior') || text.includes('elderly') || text.includes('older')) tags.push('Seniors');
    if (text.includes('disability') || text.includes('disabled') || text.includes('accessible')) tags.push('Disability');
    if (text.includes('family') || text.includes('parent') || text.includes('child')) tags.push('Family');
    if (text.includes('cultural') || text.includes('culture') || text.includes('ethnic')) tags.push('Cultural');
    if (text.includes('art') || text.includes('creative') || text.includes('music') || text.includes('theatre')) tags.push('Arts');
    if (text.includes('environment') || text.includes('green') || text.includes('sustainability')) tags.push('Environment');
    
    // Community-specific tags
    if (text.includes('african') || text.includes('black') || text.includes('caribbean')) tags.push('African/Black');
    if (text.includes('asian') || text.includes('chinese') || text.includes('korean') || text.includes('vietnamese')) tags.push('Asian');
    if (text.includes('indigenous') || text.includes('native') || text.includes('first nation')) tags.push('Indigenous');
    if (text.includes('latin') || text.includes('hispanic') || text.includes('spanish')) tags.push('Latino/Hispanic');
    if (text.includes('arab') || text.includes('middle east') || text.includes('muslim')) tags.push('Arab/Middle Eastern');
    if (text.includes('french') || text.includes('francophone')) tags.push('Francophone');
    if (text.includes('ghanaian') || text.includes('ghana')) tags.push('Ghanaian');
    if (text.includes('ukrainian') || text.includes('ukraine')) tags.push('Ukrainian');
    if (text.includes('afghan') || text.includes('afghanistan')) tags.push('Afghan');
    
    return tags.length > 0 ? tags : ['General'];
  };

  // Helper function to parse contact information from description
  const parseContactInfo = (description: string) => {
    const phoneRegex = /Phone:\s*([^.]+?)(?:\.|$|\s+Email)/gi;
    const emailRegex = /Email:\s*([^\s.]+@[^\s.]+)/gi;
    const addressRegex = /Address:\s*([^.]+?)(?:\.|$|\s+Phone|\s+Email)/gi;
    
    const phoneMatches = Array.from(description.matchAll(phoneRegex));
    const emailMatches = Array.from(description.matchAll(emailRegex));
    const addressMatches = Array.from(description.matchAll(addressRegex));
    
    const phones = phoneMatches.map(match => match[1].trim());
    const emails = emailMatches.map(match => match[1].trim());
    const addresses = addressMatches.map(match => match[1].trim());
    
    // Clean description by removing parsed contact info
    let cleanDescription = description;
    phoneMatches.forEach(match => {
      cleanDescription = cleanDescription.replace(match[0], '');
    });
    emailMatches.forEach(match => {
      cleanDescription = cleanDescription.replace(match[0], '');
    });
    addressMatches.forEach(match => {
      cleanDescription = cleanDescription.replace(match[0], '');
    });
    
    // Clean up extra spaces and dots
    cleanDescription = cleanDescription
      .replace(/\s+/g, ' ')
      .replace(/\.\s*\./g, '.')
      .replace(/\s*\.\s*$/, '')
      .trim();
    
    return {
      cleanDescription,
      phones,
      emails,
      addresses
    };
  };

  // Convert Toronto Non-Profits data to SimpleOrgAccordion format
  const convertToAccordionFormat = () => {
    return Object.entries(torontoNonProfitsData).map(([category, organizations]) => ({
      title: category,
      organizations: organizations.map(org => ({
        name: org.name,
        description: org.description,
        url: org.url
      }))
    }));
  };



  // Enhanced category colors for better visual hierarchy
  const torontoNonprofitCategoryColors: Record<string, {
    header: string;
    background: string;
    border: string;
    icon: string;
  }> = {
    'Settlement & Employment': {
      header: 'bg-emerald-600 hover:bg-emerald-700',
      background: 'bg-emerald-50',
      border: 'border-emerald-300',
      icon: 'fas fa-handshake'
    },
    'Arts & Culture': {
      header: 'bg-rose-600 hover:bg-rose-700',
      background: 'bg-rose-50',
      border: 'border-rose-300',
      icon: 'fas fa-palette'
    },
    'Youth & LGBTQ+': {
      header: 'bg-violet-600 hover:bg-violet-700',
      background: 'bg-violet-50',
      border: 'border-violet-300',
      icon: 'fas fa-heart'
    },
    'Food Security': {
      header: 'bg-orange-600 hover:bg-orange-700',
      background: 'bg-orange-50',
      border: 'border-orange-300',
      icon: 'fas fa-utensils'
    },
    'Environment & Sustainability': {
      header: 'bg-teal-600 hover:bg-teal-700',
      background: 'bg-teal-50',
      border: 'border-teal-300',
      icon: 'fas fa-leaf'
    },
    'African & Black Communities': {
      header: 'bg-amber-600 hover:bg-amber-700',
      background: 'bg-amber-50',
      border: 'border-amber-300',
      icon: 'fas fa-users'
    },
    'Ghana & Ghanaian Communities': {
      header: 'bg-red-600 hover:bg-red-700',
      background: 'bg-red-50',
      border: 'border-red-300',
      icon: 'fas fa-flag'
    }
  };

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

  const toggleTorontoNonprofitCategory = (category: string) => {
    setExpandedTorontoNonprofitCategories(prev => {
      const isCurrentlyExpanded = prev.includes(category);
      if (isCurrentlyExpanded) {
        return []; // Close the current category
      } else {
        return [category]; // Open only this category, close all others
      }
    });
  };

  const isTorontoNonprofitCategoryExpanded = (category: string) => {
    return expandedTorontoNonprofitCategories.includes(category);
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
    "Toronto Non-Profits": { from: "from-purple-600", to: "to-purple-700", icon: "fas fa-city", emoji: "🏙️" },

  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Window Controls Overlay for PWA */}
      <div className="window-controls-overlay">
        <div className="flex items-center space-x-2 px-4">
          <i className="fas fa-maple-leaf text-red-400 text-lg"></i>
          <h1 className="text-lg font-bold text-foreground">Information Access Hub</h1>
        </div>
      </div>
      
      {/* Fixed Header */}
      <header className="header-gradient text-white shadow-xl fixed left-0 right-0 top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <i className="fas fa-maple-leaf text-red-400 text-lg sm:text-xl lg:text-2xl drop-shadow-sm"></i>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">Information Access Hub</h1>
                <p className="text-blue-50 mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base">Information about Non-Profits and Community Supports</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">

              <ShareButton />
            </div>
          </div>
        </div>
      </header>

      {/* Header Spacer */}
      <div className="h-20 sm:h-24 lg:h-28"></div>

      {/* Disclaimer Text Box */}
      <div className="max-w-screen-lg mx-auto px-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="bg-yellow-100 p-2 rounded-full mt-1">
              <i className="fas fa-exclamation-triangle text-yellow-600 text-sm"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-800 text-sm mb-1">Important Disclaimer</h3>
              <p className="text-yellow-700 text-sm leading-relaxed mb-3">
                <strong>Information Access Hub</strong> is not affiliated with, endorsed by, or representing any government entity, including the Government of Canada. It is a convenience tool designed to provide information sourced from official government websites. For official government services, please visit authorized sites such as <a href="https://canada.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">canada.ca</a>. Use of this app is at your own discretion, and we are not responsible for any inaccuracies or consequences arising from its use.
              </p>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                <p className="text-yellow-800 text-sm font-medium">
                  <i className="fas fa-shield-alt text-yellow-600 mr-2"></i>
                  Please click on the <a href="/important-disclaimer.html" className="font-bold text-red-600 underline hover:text-red-800">Privacy Policy</a> link to read our complete privacy policy and data handling practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 hover:bg-opacity-90 active:scale-95 min-w-max border-2 ${
                activeTab === 'privacy' 
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-2xl border-red-400 transform scale-105' 
                  : 'bg-white text-gray-700 border-red-300 hover:bg-red-50 hover:border-red-400 shadow-lg'
              }`}
            >
              <i className="fas fa-shield-alt text-lg"></i>
              <span className="text-base font-bold">Privacy Policy</span>
              <i className="fas fa-exclamation-triangle text-sm text-yellow-300"></i>
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
                       category === "Toronto Non-Profits" ? "200+" :
                       filteredLinks.length} service{
                        (category === "Police & Security Forces" ? 54 : 
                         category === "Education" ? 50 :
                         category === "Embassies" ? 200 :
                         category === "Major Transportation" ? 50 :
                         category === "Toronto Non-Profits" ? 200 :
                         filteredLinks.length) !== 1 ? 's' : ''
                      } available
                      {!isCategoryExpanded(category) && <span className="ml-2 font-medium">• Click to expand</span>}
                    </p>
                  </button>
                  
                  {isCategoryExpanded(category) && (
                    <div className="p-4 bg-white">
                      {category === "Toronto Non-Profits" ? (
                        <div className="space-y-6">
                          {/* Info Bar */}
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-sm text-purple-700 text-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Toronto-based non-profit organizations categorized by their primary focus areas and services.
                            </div>
                          </div>

                          {/* Filter Dropdown */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-filter text-purple-600"></i>
                              <label htmlFor="toronto-nonprofit-filter" className="text-sm font-medium text-gray-700">
                                Filter by Category:
                              </label>
                              <Select value={selectedTorontoNonprofitFilter} onValueChange={setSelectedTorontoNonprofitFilter}>
                                <SelectTrigger className="w-64">
                                  <SelectValue placeholder="Select category..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Categories</SelectItem>
                                  {Object.keys(torontoNonProfitsData).map((categoryName) => (
                                    <SelectItem key={categoryName} value={categoryName}>
                                      {categoryName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Toronto Non-Profits - Interactive Accordion */}
                          <div className="space-y-4">
                            {Object.entries(torontoNonProfitsData)
                              .filter(([nonprofitCategory]) => 
                                selectedTorontoNonprofitFilter === "all" || nonprofitCategory === selectedTorontoNonprofitFilter
                              )
                              .map(([nonprofitCategory, organizations]) => {
                              const categoryStyle = torontoNonprofitCategoryColors[nonprofitCategory] || {
                                header: 'bg-gray-600 hover:bg-gray-700',
                                background: 'bg-gray-50',
                                border: 'border-gray-300',
                                icon: 'fas fa-building'
                              };
                              
                              const isExpanded = isTorontoNonprofitCategoryExpanded(nonprofitCategory);
                              
                              return (
                                <div key={nonprofitCategory} className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${categoryStyle.background} ${categoryStyle.border} border-2`}>
                                  <button
                                    onClick={() => toggleTorontoNonprofitCategory(nonprofitCategory)}
                                    className={`w-full flex items-center justify-between px-6 py-4 text-white font-bold text-lg transition-all duration-300 ${categoryStyle.header}`}
                                    aria-expanded={isExpanded}
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <i className={`${categoryStyle.icon} text-lg`}></i>
                                      </div>
                                      <span>{nonprofitCategory}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full font-medium">
                                        {organizations.length} organizations
                                      </span>
                                      <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-lg transition-transform duration-200`}></i>
                                    </div>
                                  </button>
                                  
                                  {isExpanded && (
                                    <div className="bg-white dark:bg-zinc-900 p-6">
                                      {/* Subcategory Filter */}
                                      <div className="mb-6 bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border">
                                        <div className="flex items-center space-x-3 mb-3">
                                          <i className="fas fa-tags text-purple-600"></i>
                                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Filter by Service Type:
                                          </label>
                                        </div>
                                        <Select 
                                          value={subcategoryFilters[nonprofitCategory] || "all"} 
                                          onValueChange={(value) => {
                                            setSubcategoryFilters(prev => ({
                                              ...prev,
                                              [nonprofitCategory]: value
                                            }));
                                          }}
                                        >
                                          <SelectTrigger className="w-full max-w-xs">
                                            <SelectValue placeholder="All Services" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="all">All Services</SelectItem>
                                            {Array.from(new Set(
                                              organizations.flatMap(org => generateTags(org.name, org.description))
                                            )).sort().map((tag) => (
                                              <SelectItem key={tag} value={tag}>
                                                {tag}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-4">
                                        {organizations
                                          .filter(org => {
                                            const selectedTag = subcategoryFilters[nonprofitCategory];
                                            if (!selectedTag || selectedTag === "all") return true;
                                            return generateTags(org.name, org.description).includes(selectedTag);
                                          })
                                          .map((org, idx) => {
                                          const contactInfo = parseContactInfo(org.description);
                                          const orgTags = generateTags(org.name, org.description);
                                          
                                          return (
                                            <div key={idx} className="border-l-4 border-purple-500 pl-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                  <div className="flex items-center space-x-3 mb-2">
                                                    {org.url ? (
                                                      <a 
                                                        href={org.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                                                      >
                                                        {org.name}
                                                        <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                                                      </a>
                                                    ) : (
                                                      <h4 className="font-semibold text-gray-900 dark:text-white">{org.name}</h4>
                                                    )}
                                                  </div>
                                                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{contactInfo.cleanDescription}</p>
                                                  
                                                  {/* Service Tags */}
                                                  <div className="flex flex-wrap gap-2 mb-3">
                                                    {orgTags.map((tag, tagIdx) => (
                                                      <span 
                                                        key={tagIdx}
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                                      >
                                                        <i className="fas fa-tag mr-1 text-xs"></i>
                                                        {tag}
                                                      </span>
                                                    ))}
                                                  </div>
                                                  
                                                  {/* Contact Information */}
                                                  <div className="space-y-2">
                                                    {contactInfo.phones.map((phone, phoneIdx) => (
                                                      <p key={phoneIdx} className="text-sm text-gray-500 dark:text-gray-400">
                                                        <i className="fas fa-phone mr-2 text-purple-500"></i>
                                                        <a 
                                                          href={`tel:${phone.replace(/[^\d+()-]/g, '')}`} 
                                                          className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                                                        >
                                                          {phone}
                                                        </a>
                                                      </p>
                                                    ))}
                                                    {contactInfo.emails.map((email, emailIdx) => (
                                                      <p key={emailIdx} className="text-sm text-gray-500 dark:text-gray-400">
                                                        <i className="fas fa-envelope mr-2 text-purple-500"></i>
                                                        <a 
                                                          href={`mailto:${email}`} 
                                                          className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                                                        >
                                                          {email}
                                                        </a>
                                                      </p>
                                                    ))}
                                                    {contactInfo.addresses.map((address, addressIdx) => (
                                                      <p key={addressIdx} className="text-sm text-gray-500 dark:text-gray-400">
                                                        <i className="fas fa-map-marker-alt mr-2 text-purple-500"></i>
                                                        <a 
                                                          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                                                        >
                                                          {address}
                                                          <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                                                        </a>
                                                      </p>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : category === "Major Transportation" ? (
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

        {/* Privacy Content */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            {/* Privacy Header */}
            <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <i className="fas fa-shield-alt text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-3">Privacy & Data Protection</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Your privacy is important to us. Learn how we protect your information and what data we collect.
                </p>
              </div>
            </div>



            {/* Detailed Privacy Policy Text */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  <i className="fas fa-shield-alt text-red-600 mr-3"></i>
                  Privacy Policy
                </h3>
                <p className="text-gray-600">Last Updated: July 22, 2025</p>
              </div>
              
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Introduction</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Welcome to <strong>Information Access Hub</strong>, a Progressive Web App developed by GiolynxApps. This privacy policy outlines how we handle your data to ensure compliance with Google Play Developer Program Policies, particularly the Misleading Claims and Personal and Sensitive User Data policies. We are committed to protecting your privacy and providing a transparent experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Disclaimer</h3>
                  <p className="text-gray-700 text-base leading-relaxed bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <strong>Information Access Hub</strong> is not affiliated with, endorsed by, or representing any government entity, including the Government of Canada. It is a convenience tool designed to provide information sourced from official government websites. For official government services, please visit authorized sites such as <a href="https://canada.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">canada.ca</a>. Use of this app is at your own discretion, and we are not responsible for any inaccuracies or consequences arising from its use.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Data Collection and Usage</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    This app does not collect, store, or share any personal data, including names, addresses, or phone numbers. We do not require login credentials or access to personally identifiable information (PII). No location tracking occurs, and no data is collected from users under 13, ensuring safety for children. Contact form data, if submitted, is used solely to respond to inquiries and is not stored or shared beyond that purpose.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Data Security</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    All connections use HTTPS encryption to secure data transmission. We do not sell, trade, or transfer any user data to outside parties. Data handling is limited to operational needs, with strict access controls in place to prevent unauthorized access.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Analytics and Tracking</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We do not use third-party analytics tools, cookies, or tracking technologies. Your browsing behavior is not monitored, ensuring a no-tracking experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Sources of Information</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Government-related information in this app is sourced from the following official Canadian government websites:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm leading-relaxed">
                    <li>Canada Revenue Agency: <a href="https://canada.ca/en/revenue-agency" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/revenue-agency</a></li>
                    <li>Employment and Social Development Canada: <a href="https://canada.ca/en/employment-social-development" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/employment-social-development</a></li>
                    <li>Immigration, Refugees and Citizenship Canada: <a href="https://canada.ca/en/immigration-refugees-citizenship" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/immigration-refugees-citizenship</a></li>
                    <li>Department of Justice: <a href="https://canada.ca/en/department-justice" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/department-justice</a></li>
                    <li>Public Health Agency of Canada: <a href="https://canada.ca/en/public-health" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/public-health</a></li>
                    <li>Elections Canada: <a href="https://elections.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">elections.ca</a></li>
                    <li>Global Affairs Canada: <a href="https://canada.ca/en/global-affairs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/global-affairs</a></li>
                    <li>Public Safety Canada: <a href="https://canada.ca/en/public-safety" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/public-safety</a></li>
                    <li>National Defence: <a href="https://canada.ca/en/department-national-defence" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/department-national-defence</a></li>
                    <li>Correctional Service of Canada: <a href="https://canada.ca/en/correctional-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/correctional-service</a></li>
                    <li>Transport Canada: <a href="https://canada.ca/en/transport" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca/en/transport</a></li>
                    <li>General Government: <a href="https://canada.ca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">canada.ca</a></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">External Links</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Links to external government sites are provided for convenience. These sites have their own privacy policies, and we encourage users to review them. All external connections are secured with HTTPS encryption.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">Policy Availability</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    This privacy policy is accessible via a valid, active URL within the app and on the Google Play Store listing page. It is non-editable and complies with Google Play requirements.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-red-600">User Rights and Contact</h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    For any privacy-related questions, contact us at <a href="mailto:Apps@Giolynx.org" className="text-blue-600 hover:text-blue-800 underline font-medium">Apps@Giolynx.org</a>. We will respond promptly to address your concerns.
                  </p>
                </div>
              </div>
              
              {/* Text Box at Bottom */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full mt-1">
                      <i className="fas fa-info-circle text-blue-600 text-base"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-base mb-2">Important Notice</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        This privacy policy is effective as of July 22, 2025, and governs the use of <strong>Information Access Hub</strong>. By using this application, you acknowledge that you have read, understood, and agree to be bound by this privacy policy. This policy may be updated periodically, and continued use of the app constitutes acceptance of any changes.
                      </p>
                      <div className="mt-3 text-center">
                        <span className="text-sm text-gray-500">&copy; 2025 <strong>Information Access Hub</strong> | GiolynxApps</span>
                      </div>
                    </div>
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
              <h4 className="font-semibold mb-2 text-white">About Information Access Hub</h4>
              <p className="text-white text-sm">Your one-stop directory for accessing official Government of Canada services and resources.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Official Links</h4>
              <ul className="text-white text-sm space-y-1">
                <li><a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">Canada.ca</a></li>
                <li><a href="https://www.canada.ca/en/services.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">All Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Contact</h4>
              <ul className="text-white text-sm space-y-1">
                <li>Contact: <a href="mailto:Apps@Giolynx.org" className="text-blue-400 hover:text-blue-300 transition-colors">Apps@Giolynx.org</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 mt-6 text-center">
            <p className="text-white text-sm mb-2">&copy; 2025 Information Access Hub</p>
            <p className="text-white text-sm">Independent directory - Not affiliated with Government of Canada</p>
            
            {/* Blue Semi-Transparent Bars */}
            <div className="mt-6 h-4 bg-blue-600 bg-opacity-5 w-full"></div>
            <div className="mt-5 h-4 bg-blue-600 bg-opacity-5 w-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}