import React from 'react';
import { Clock } from 'lucide-react';

const DurationField = ({ value, onChange }) => {
  return (
    <div className="relative cursor-pointer w-full">
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Duration</label>
      <div className="relative">
        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 font-medium text-sm cursor-pointer appearance-none truncate">
          {[1,2,3,4,5,6,7,8,9,'10+'].map(d => (
            <option key={d} value={d + ' Days'}>{d} {d === 1 ? 'Day' : 'Days'}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default DurationField;