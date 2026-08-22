import React from 'react';
import { IndianRupee } from 'lucide-react';

const options = ['Any Budget', 'Under ₹5,000', '₹5,000 – ₹10,000', '₹10,000 – ₹20,000', '₹20,000+'];

const WeekendBudget = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <label className="block truncate text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center justify-between">
        Budget <span className="text-[10px] text-gray-400 font-normal normal-case tracking-normal">Per person</span>
      </label>
      <div className="relative">
        <IndianRupee className="w-4 h-4 absolute left-3.5 top-4 text-gray-400 pointer-events-none" />
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full !pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-medium text-gray-900 cursor-pointer">
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </div>
  );
};
export default WeekendBudget;