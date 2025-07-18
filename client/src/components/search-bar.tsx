import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    // Add keyboard shortcut for search (Ctrl+K or Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <section className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <i className="fas fa-search absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base"></i>
            <Input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search services... (Ctrl+K)"
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 text-sm sm:text-base"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
            <i className="fas fa-info-circle mr-1"></i> 
            Search by service name or keyword
          </p>
        </div>
      </div>
    </section>
  );
}
