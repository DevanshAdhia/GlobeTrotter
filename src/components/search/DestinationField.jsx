import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const DestinationField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative w-full">
      <label className="block text-[11px] font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">
        Where to?
      </label>
      <div 
        className="relative cursor-pointer group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary z-10 pointer-events-none">
          <MapPin className="w-4 h-4" />
        </div>
        
        <input 
          type="text" 
          readOnly 
          value={value} 
          placeholder="Search destination..." 
          className="search-input-field w-full bg-gray-50/90 hover:bg-gray-100/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 cursor-pointer truncate placeholder-gray-400 transition-all shadow-xs" 
        />
        
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 group-hover:text-gray-600" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full min-w-[220px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-3 py-2 border-b border-gray-100">
            Popular Destinations
          </div>
          <div className="py-1 max-h-56 overflow-y-auto">
            {['Kashmir', 'Goa', 'Kerala', 'Rajasthan', 'Himachal', 'Dubai', 'Singapore', 'Thailand', 'Bali'].map(d => (
              <button 
                key={d} 
                onClick={() => { onChange(d); setIsOpen(false); }} 
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  value === d 
                    ? 'bg-blue-50 text-primary font-bold' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{d}</span>
                {value === d && <span className="w-2 h-2 rounded-full bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationField;