import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const searchSuggestions = [
  "Search destinations...",
  "Search Goa...",
  "Search Kerala...",
  "Search Rajasthan...",
  "Search Manali...",
  "Search Kashmir..."
];

const DestinationSearch = ({ value, onChange }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-1 max-w-md">
      <label htmlFor="dest-search" className="sr-only">Search destinations</label>
      <div className="relative flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <div className="absolute left-4 z-10 flex items-center justify-center">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Animated Placeholder Text */}
        {!value && (
          <div className="absolute left-12 top-0 bottom-0 flex items-center pointer-events-none text-gray-400">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap"
              >
                {searchSuggestions[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        <input 
          id="dest-search" 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full h-full pl-12 pr-10 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 z-10" 
          style={{ paddingLeft: '3rem' }}
        />
        
        {value && (
          <button aria-label="Clear search" onClick={() => onChange('')} className="absolute right-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 z-20">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
export default DestinationSearch;