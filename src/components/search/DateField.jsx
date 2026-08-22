import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const DateField = ({ value, onChange }) => {
  return (
    <div className="relative cursor-pointer w-full">
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Duration</label>
      <div className="relative">
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <input type="date" onChange={(e) => onChange(new Date(e.target.value))} 
          className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 font-medium text-sm cursor-pointer placeholder-gray-400" />
      </div>
    </div>
  );
};
export default DateField;