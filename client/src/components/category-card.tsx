import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Link {
  title: string;
  description: string;
  url: string;
  icon?: string;
}

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  links: Link[];
  gradientFrom: string;
  gradientTo: string;
  searchTerm: string;
}

export default function CategoryCard({
  title,
  description,
  icon,
  links,
  gradientFrom,
  gradientTo,
  searchTerm
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  };

  const filteredLinks = links.filter(link => 
    !searchTerm || 
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && filteredLinks.length === 0) {
    return null;
  }

  return (
    <Card className="category-card bg-white rounded-xl shadow-md overflow-hidden" data-category={title}>
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-4 sm:p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <i className={`${icon} text-white text-xl sm:text-2xl`}></i>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{title}</h2>
          </div>
          <button 
            className="text-white hover:text-opacity-80 transition-colors p-2 min-h-12 min-w-12 flex items-center justify-center"
            onClick={toggleExpanded}
          >
            <i className={`fas fa-chevron-down transform transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'} text-lg`}></i>
          </button>
        </div>
        <p className="text-white text-opacity-90 mt-2 text-sm sm:text-base">{description}</p>
      </div>
      
      {isExpanded && (
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {filteredLinks.map((link, index) => (
              <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-2 sm:space-x-3 mb-2">
                  {link.icon && <i className={`${link.icon} text-blue-600 text-base sm:text-lg mt-1`}></i>}
                  <div className="flex-1">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-item font-semibold text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base block"
                    >
                      <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.title, searchTerm) }}></span>
                      <i className="fas fa-external-link-alt ml-2 text-xs sm:text-sm"></i>
                    </a>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.description, searchTerm) }}></span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
