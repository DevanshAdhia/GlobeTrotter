import React, { useState } from 'react';
import { Users } from 'lucide-react';

const TravelerField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = value.adults + value.children + value.infants;
  return (
    <div className="relative w-full">
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Travelers</label>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="text" readOnly value={`${value.adults} Adults ${value.children > 0 ? ', ' + value.children + ' Child' : ''}`} 
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 font-medium text-sm cursor-pointer truncate" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 space-y-4">
          {['adults', 'children', 'infants'].map(type => (
            <div key={type} className="flex justify-between items-center">
              <div>
                <p className="capitalize font-medium text-gray-900">{type}</p>
                <p className="text-xs text-gray-500">{type === 'adults' ? 'Ages 12+' : type === 'children' ? 'Ages 2-12' : 'Under 2'}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => onChange({ ...value, [type]: Math.max(type==='adults'?1:0, value[type]-1)})} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">-</button>
                <span className="w-4 text-center font-medium">{value[type]}</span>
                <button onClick={() => onChange({ ...value, [type]: value[type]+1})} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">+</button>
              </div>
            </div>
          ))}
          <button onClick={() => setIsOpen(false)} className="w-full py-2 bg-primary text-white rounded-lg font-medium text-sm">Done</button>
        </div>
      )}
    </div>
  );
};
export default TravelerField;