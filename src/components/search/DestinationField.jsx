import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const DestinationField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full">
      <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1 uppercase tracking-wider">Where to?</label>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        <input 
          type="text" 
          readOnly 
          value={value} 
          placeholder="Search destination" 
          className="w-full pl-10 pr-4 py-3 bg-gray-50/90 hover:bg-gray-100/80 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-semibold text-sm cursor-pointer truncate placeholder-gray-400 transition-all" 
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-2">Popular Cities</div>
          {['Kashmir', 'Goa', 'Kerala', 'Dubai', 'Singapore', 'Thailand'].map(d => (
            <button 
              key={d} 
              onClick={() => { onChange(d); setIsOpen(false); }} 
              className="w-full text-left px-3.5 py-2.5 hover:bg-primary/5 hover:text-primary rounded-xl text-sm font-semibold text-gray-700 transition-colors"
            >
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default DestinationField;