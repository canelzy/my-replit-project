import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Link {
  title: string;
  url: string;
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
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  };

  const filteredLinks = links.filter(link => 
    !searchTerm || link.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && filteredLinks.length === 0) {
    return null;
  }

  return (
    <Card className="category-card bg-white rounded-xl shadow-md overflow-hidden">
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className={`${icon} text-white text-2xl`}></i>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <button 
            className="text-white hover:text-opacity-80 transition-colors"
            onClick={toggleExpanded}
          >
            <i className={`fas fa-chevron-down transform transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}></i>
          </button>
        </div>
        <p className="text-white text-opacity-90 mt-2">{description}</p>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          {title === "Other Services" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-3">
                {filteredLinks.slice(0, Math.ceil(filteredLinks.length / 2)).map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-item flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <i className="fas fa-external-link-alt text-sm"></i>
                      <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.title, searchTerm) }}></span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {filteredLinks.slice(Math.ceil(filteredLinks.length / 2)).map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-item flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <i className="fas fa-external-link-alt text-sm"></i>
                      <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.title, searchTerm) }}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-item flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <i className="fas fa-external-link-alt text-sm"></i>
                    <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.title, searchTerm) }}></span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}
