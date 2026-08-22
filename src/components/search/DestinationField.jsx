import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const DestinationField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full">
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Where to?</label>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="text" readOnly value={value} placeholder="Search destination" 
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 font-medium text-sm cursor-pointer truncate placeholder-gray-400" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Popular</div>
          {['Kashmir', 'Goa', 'Kerala', 'Dubai', 'Singapore', 'Thailand'].map(d => (
            <button key={d} onClick={() => { onChange(d); setIsOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700">{d}</button>
          ))}
        </div>
      )}
    </div>
  );
};
export default DestinationField;