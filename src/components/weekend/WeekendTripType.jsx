import React from 'react';
import { Compass } from 'lucide-react';

const options = ['Any Type', 'Nature', 'Beach', 'Adventure', 'Romantic', 'Family', 'Road Trip', 'Luxury', 'Heritage'];

const WeekendTripType = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Trip Type</label>
      <div className="relative">
        <Compass className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-medium text-gray-900 cursor-pointer">
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </div>
  );
};
export default WeekendTripType;