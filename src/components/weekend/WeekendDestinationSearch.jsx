import React from 'react';
import { Search, X } from 'lucide-react';

const WeekendDestinationSearch = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 max-w-sm">
      <label htmlFor="we-search" className="sr-only">Search weekend destinations</label>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        <input id="we-search" type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="Search destinations..." autoComplete="off"
          className="w-full pl-12 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white" />
        {value && (
          <button aria-label="Clear search" onClick={() => onChange('')} className="absolute right-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
export default WeekendDestinationSearch;