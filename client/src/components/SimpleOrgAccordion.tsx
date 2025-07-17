import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Organization = {
  name: string;
  description: string;
  url?: string;
};

type Category = {
  title: string;
  organizations: Organization[];
};

const categoryColors: Record<string, string> = {
  "Settlement & Employment": "bg-emerald-600",
  "Arts & Culture": "bg-rose-600",
  "Youth & LGBTQ+": "bg-violet-600",
  "Food Security": "bg-orange-600",
  "Environment & Sustainability": "bg-teal-600",
  "African & Black Communities": "bg-amber-600",
  "Ghana & Ghanaian Communities": "bg-red-600",
};

export default function SimpleOrgAccordion({ categories }: { categories: Category[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {categories.map((cat, index) => {
        const isOpen = openIndex === index;
        const headerColor = categoryColors[cat.title] || "bg-gray-600";
        
        return (
          <div key={index} className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleIndex(index)}
              className={`w-full flex items-center justify-between px-6 py-4 text-white font-bold text-lg transition-all duration-200 ${headerColor} hover:opacity-90`}
            >
              <span>{cat.title}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {cat.organizations.length} organizations
                </span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {/* Category Content */}
            {isOpen && (
              <div className="bg-white p-6">
                <div className="space-y-6">
                  {cat.organizations.map((org, idx) => {
                    const contact = parseContactInfo(org.description);
                    
                    return (
                      <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{org.name}</h3>
                        <p className="text-gray-700 mb-3 leading-relaxed">{org.description}</p>
                        
                        {/* Contact Information */}
                        <div className="space-y-1 text-sm text-gray-600">
                          {contact.address && (
                            <div className="flex items-start space-x-2">
                              <span className="font-medium">📍</span>
                              <span>{contact.address}</span>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">📞</span>
                              <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-green-700 hover:text-green-900 underline">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">✉️</span>
                              <a href={`mailto:${contact.email}`} className="text-purple-700 hover:text-purple-900 underline">
                                {contact.email}
                              </a>
                            </div>
                          )}
                          {(contact.website || org.url) && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">🌐</span>
                              <a href={contact.website || org.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline">
                                {contact.website || org.url}
                              </a>
                            </div>
                          )}
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