import React, { useState } from 'react';
import { Users, ChevronDown, Minus, Plus } from 'lucide-react';

const TravelerField = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative w-full">
      <label className="block text-[11px] font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">
        Travelers
      </label>
      <div 
        className="relative cursor-pointer group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary z-10 pointer-events-none">
          <Users className="w-4 h-4" />
        </div>
        
        <input 
          type="text" 
          readOnly 
          value={`${value.adults} Adult${value.adults > 1 ? 's' : ''}${value.children > 0 ? `, ${value.children} Child` : ''}`} 
          className="w-full pl-11 pr-8 py-3 bg-gray-50/90 hover:bg-gray-100/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-bold text-sm cursor-pointer truncate transition-all shadow-xs" 
        />

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 group-hover:text-gray-600" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-72 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
            Select Guests
          </div>

          {[
            { type: 'adults', title: 'Adults', desc: 'Ages 12+' },
            { type: 'children', title: 'Children', desc: 'Ages 2-12' },
            { type: 'infants', title: 'Infants', desc: 'Under 2' }
          ].map(({ type, title, desc }) => (
            <div key={type} className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => onChange({ ...value, [type]: Math.max(type === 'adults' ? 1 : 0, value[type] - 1)})} 
                  className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center font-bold text-gray-900 text-sm">{value[type]}</span>
                <button 
                  onClick={() => onChange({ ...value, [type]: value[type] + 1})} 
                  className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setIsOpen(false)} 
            className="w-full py-2.5 bg-primary text-white rounded-xl font-extrabold text-xs hover:bg-primary-dark transition-colors shadow-md uppercase tracking-wider"
          >
            Apply Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelerField;