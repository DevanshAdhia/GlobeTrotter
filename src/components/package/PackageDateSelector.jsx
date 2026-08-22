import React from 'react';
import { CalendarDays } from 'lucide-react';
import { format, addDays } from 'date-fns';

const PackageDateSelector = ({ selectedDate, setSelectedDate }) => {
  const minDate = format(addDays(new Date(), 2), 'yyyy-MM-dd'); // Requires 2 days advance notice ideally
  
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <label htmlFor="package-date" className="flex items-center text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
        <CalendarDays className="w-4 h-4 mr-2" /> Travel Date
      </label>
      <input
        type="date"
        id="package-date"
        min={minDate}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
export default PackageDateSelector;