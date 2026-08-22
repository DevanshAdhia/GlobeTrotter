import React, { useState } from 'react';
import { Users } from 'lucide-react';

const TravelerField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-full">
      <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1 uppercase tracking-wider">Travelers</label>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
        <input 
          type="text" 
          readOnly 
          value={`${value.adults} Adults ${value.children > 0 ? ', ' + value.children + ' Child' : ''}`} 
          className="w-full pl-10 pr-4 py-3 bg-gray-50/90 hover:bg-gray-100/80 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-semibold text-sm cursor-pointer truncate transition-all" 
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {['adults', 'children', 'infants'].map(type => (
            <div key={type} className="flex justify-between items-center">
              <div>
                <p className="capitalize font-bold text-gray-900 text-sm">{type}</p>
                <p className="text-xs text-gray-500">{type === 'adults' ? 'Ages 12+' : type === 'children' ? 'Ages 2-12' : 'Under 2'}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onChange({ ...value, [type]: Math.max(type==='adults'?1:0, value[type]-1)})} 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="w-4 text-center font-bold text-gray-900">{value[type]}</span>
                <button 
                  onClick={() => onChange({ ...value, [type]: value[type]+1})} 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-full py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-md"
          >
            Apply Selection
          </button>
        </div>
      )}
    </div>
  );
};
export default TravelerField;