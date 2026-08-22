import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const DateField = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <label className="block text-[11px] font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">
        Duration / Date
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10">
          <CalendarIcon className="w-4 h-4" />
        </div>
        <input 
          type="date" 
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)} 
          className="w-full pl-11 pr-3 py-3 bg-gray-50/90 hover:bg-gray-100/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-bold text-sm cursor-pointer transition-all shadow-xs" 
        />
      </div>
    </div>
  );
};

export default DateField;