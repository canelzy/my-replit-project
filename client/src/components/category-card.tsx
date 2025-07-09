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
  favorites: string[];
  onToggleFavorite: (url: string) => void;
}

export default function CategoryCard({
  title,
  description,
  icon,
  links,
  gradientFrom,
  gradientTo,
  searchTerm,
  favorites,
  onToggleFavorite
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
    !searchTerm || 
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="space-y-4">
            {filteredLinks.map((link, index) => (
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
                      <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.title, searchTerm) }}></span>
                      <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm ml-6">
                    <span dangerouslySetInnerHTML={{ __html: highlightSearchTerm(link.description, searchTerm) }}></span>
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(link.url)}
                  className="ml-4 text-yellow-500 hover:text-yellow-600"
                >
                  <i className={`fas fa-star ${favorites.includes(link.url) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
