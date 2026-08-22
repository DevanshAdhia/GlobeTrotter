import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchSuggestions = [
  "Search destinations...",
  "Search Dubai...",
  "Search Bali...",
  "Search Maldives...",
  "Search Europe..."
];

const suggestionsList = ['Dubai', 'Bali', 'Maldives', 'Singapore', 'Thailand', 'Europe', 'Switzerland', 'Japan', 'Vietnam', 'Australia'];

const InternationalDestinationSearch = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (sugg) => {
    onChange(sugg);
    setIsFocused(false);
  };

  return (
    <div className="relative flex-1 max-w-md" ref={wrapperRef}>
      <label htmlFor="intl-search" className="sr-only">Search countries or destinations</label>
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
          id="intl-search" 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          onFocus={() => setIsFocused(true)}
          autoComplete="off"
          className="w-full h-full pl-12 pr-10 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 z-10" 
          style={{ paddingLeft: '3rem' }}
        />
        
        {value && (
          <button aria-label="Clear destination search" onClick={() => { onChange(''); setIsFocused(true); }} className="absolute right-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 z-20">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isFocused && !value && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl p-3 z-50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Popular International Destinations</h4>
            <ul>
              {suggestionsList.map((sugg) => (
                <li key={sugg}>
                  <button onClick={() => handleSelect(sugg)} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center text-gray-700 focus:bg-gray-50 focus:outline-none">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" /> {sugg}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default InternationalDestinationSearch;