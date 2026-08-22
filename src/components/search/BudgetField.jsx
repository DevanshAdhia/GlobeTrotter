import React from 'react';
import { IndianRupee, ChevronDown } from 'lucide-react';

const BudgetField = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <label className="block text-[11px] font-extrabold text-gray-500 mb-1.5 uppercase tracking-wider">
        Budget
      </label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none z-10">
          <IndianRupee className="w-4 h-4" />
        </div>
        <select 
          value={value} 
          onChange={e => onChange(e.target.value)}
          className="w-full pl-11 pr-8 py-3 bg-gray-50/90 hover:bg-gray-100/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 font-bold text-sm cursor-pointer appearance-none truncate transition-all shadow-xs"
        >
          <option>Any Budget</option>
          <option>Under ₹25,000</option>
          <option>₹25,000 – ₹50,000</option>
          <option>₹50,000 – ₹1,00,000</option>
          <option>Above ₹1,00,000</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 group-hover:text-gray-600" />
      </div>
    </div>
  );
};

export default BudgetField;