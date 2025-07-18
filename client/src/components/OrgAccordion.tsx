import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, ChevronDown, ChevronUp, Search, Filter, CheckCircle } from "lucide-react";

type Organization = {
  name: string;
  description: string;
  url?: string;
};

type Category = {
  title: string;
  organizations: Organization[];
};

const categoryColors: Record<string, {
  header: string;
  background: string;
  border: string;
  icon: string;
}> = {
  "Settlement & Employment": {
    header: "bg-emerald-600 hover:bg-emerald-700",
    background: "bg-emerald-50",
    border: "border-emerald-300",
    icon: "🤝"
  },
  "Arts & Culture": {
    header: "bg-rose-600 hover:bg-rose-700",
    background: "bg-rose-50",
    border: "border-rose-300",
    icon: "🎨"
  },
  "Youth & LGBTQ+": {
    header: "bg-violet-600 hover:bg-violet-700",
    background: "bg-violet-50",
    border: "border-violet-300",
    icon: "❤️"
  },
  "Food Security": {
    header: "bg-orange-600 hover:bg-orange-700",
    background: "bg-orange-50",
    border: "border-orange-300",
    icon: "🍽️"
  },
  "Environment & Sustainability": {
    header: "bg-teal-600 hover:bg-teal-700",
    background: "bg-teal-50",
    border: "border-teal-300",
    icon: "🌱"
  },
  "African & Black Communities": {
    header: "bg-amber-600 hover:bg-amber-700",
    background: "bg-amber-50",
    border: "border-amber-300",
    icon: "👥"
  },
  "Ghana & Ghanaian Communities": {
    header: "bg-red-600 hover:bg-red-700",
    background: "bg-red-50",
    border: "border-red-300",
    icon: "🇬🇭"
  }
};

const commonTags = [
  "health", "legal", "youth", "women", "employment", "housing", "education", 
  "mental health", "food", "seniors", "immigrant", "refugee", "disability", 
  "family", "community", "training", "arts", "culture", "advocacy", "support"
];

export default function OrgAccordion({ categories }: { categories: Category[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerms, setSearchTerms] = useState<{[key: string]: string}>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const extractTags = (description: string): string[] => {
    const tags: string[] = [];
    const lowerDesc = description.toLowerCase();
    
    commonTags.forEach(tag => {
      if (lowerDesc.includes(tag.toLowerCase())) {
        tags.push(tag);
      }
    });
    
    return tags;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const updateSearchTerm = (category: string, term: string) => {
    setSearchTerms(prev => ({ ...prev, [category]: term }));
  };



  const parseContactInfo = (description: string) => {
    const addressMatch = description.match(/Address:\s*([^.]+)/);
    const phoneMatch = description.match(/Phone:\s*([^.]+)/);
    const emailMatch = description.match(/Email:\s*([^.\s]+)/);
    const websiteMatch = description.match(/(https?:\/\/[^\s]+)/);
    
    return {
      address: addressMatch ? addressMatch[1].trim() : '',
      phone: phoneMatch ? phoneMatch[1].trim() : '',
      email: emailMatch ? emailMatch[1].trim() : '',
      website: websiteMatch ? websiteMatch[1].trim() : ''
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Global Tag Filter */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700">
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <Filter className="mr-2 w-5 h-5 text-purple-600" />
            Filter by Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {commonTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat, index) => {
        const isOpen = openIndex === index;
        const categoryStyle = categoryColors[cat.title] || {
          header: 'bg-gray-600 hover:bg-gray-700',
          background: 'bg-gray-50',
          border: 'border-gray-300',
          icon: '🏢'
        };

        const searchTerm = searchTerms[cat.title] || "";
        const filteredOrganizations = cat.organizations.filter(org => {
          const matchesSearch = searchTerm === "" || 
            org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesTags = selectedTags.length === 0 || 
            selectedTags.some(tag => extractTags(org.description).includes(tag));
          
          return matchesSearch && matchesTags;
        });

        if (filteredOrganizations.length === 0) return null;

        return (
          <div key={index} className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${categoryStyle.background} ${categoryStyle.border} border-2`}>
            {/* Category Header */}
            <button
              onClick={() => toggleIndex(index)}
              className={`w-full flex items-center justify-between px-6 py-4 text-white font-bold text-lg transition-all duration-300 ${categoryStyle.header}`}
              aria-expanded={isOpen}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">{categoryStyle.icon}</span>
                </div>
                <span>{cat.title}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full font-medium">
                  {filteredOrganizations.length} organizations
                </span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {/* Category Content */}
            {isOpen && (
              <div className="bg-white dark:bg-zinc-900 p-6">
                {/* Category Search Filter */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Search within ${cat.title}...`}
                      value={searchTerm}
                      onChange={(e) => updateSearchTerm(cat.title, e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    />
                    <Search className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
                    {searchTerm && (
                      <button
                        onClick={() => updateSearchTerm(cat.title, "")}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {/* Results Counter */}
                  {(searchTerm || selectedTags.length > 0) && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <Filter className="inline w-4 h-4 mr-1" />
                      Showing {filteredOrganizations.length} of {cat.organizations.length} organizations
                      {selectedTags.length > 0 && (
                        <span className="ml-2">
                          • Filtered by {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Organizations List */}
                <div className="space-y-4">
                  {filteredOrganizations.map((org, idx) => {
                    const organizationTags = extractTags(org.description);
                    const contact = parseContactInfo(org.description);
                    
                    return (
                      <div key={idx} className="border-b border-gray-200 dark:border-zinc-700 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{org.name}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{org.description}</p>
                            
                            {/* Contact Information */}
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {contact.address && (
                                <div className="flex items-start space-x-2">
                                  <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                                  <span>{contact.address}</span>
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 underline font-medium">
                                    {contact.phone}
                                  </a>
                                </div>
                              )}
                              {contact.email && (
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  <a href={`mailto:${contact.email}`} className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 underline font-medium">
                                    {contact.email}
                                  </a>
                                </div>
                              )}
                              {(contact.website || org.url) && (
                                <div className="flex items-center space-x-2">
                                  <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  <a href={contact.website || org.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 underline font-medium">
                                    {contact.website || org.url}
                                  </a>
                                </div>
                              )}
                            </div>

                            {/* Tags */}
                            {organizationTags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {organizationTags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      selectedTags.includes(tag)
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-400'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
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
  );
}