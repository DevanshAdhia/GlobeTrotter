import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const DateField = ({ value, onChange }) => {
  return (
    <div className="relative cursor-pointer w-full">
      <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1 uppercase tracking-wider">Duration</label>
      <div className="relative">
        <CalendarIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        <input 
          type="date" 
          onChange={(e) => onChange(new Date(e.target.value))} 
          className="w-full pl-4 pr-10 py-3 bg-gray-50/90 hover:bg-gray-100/80 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-semibold text-sm cursor-pointer transition-all" 
        />
      </div>
    </div>
  );
};
export default DateField;