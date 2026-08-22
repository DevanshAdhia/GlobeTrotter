import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestionsList = ['Dubai', 'Bali', 'Maldives', 'Singapore', 'Thailand', 'Europe', 'Switzerland', 'Japan', 'Vietnam', 'Australia'];

const InternationalDestinationSearch = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
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

  const handleSelect = (sugg) => {
    onChange(sugg);
    setIsFocused(false);
  };

  return (
    <div className="relative flex-1 max-w-md" ref={wrapperRef}>
      <label htmlFor="intl-search" className="sr-only">Search countries or destinations</label>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input id="intl-search" type="text" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setIsFocused(true)}
          placeholder="Search countries or destinations..." autoComplete="off"
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white" />
        {value && (
          <button aria-label="Clear destination search" onClick={() => { onChange(''); setIsFocused(true); }} className="absolute right-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
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