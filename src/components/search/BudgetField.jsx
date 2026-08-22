import React from 'react';
import { IndianRupee } from 'lucide-react';

const BudgetField = ({ value, onChange }) => {
  return (
    <div className="relative cursor-pointer w-full">
      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Budget</label>
      <div className="relative">
        <IndianRupee className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 font-medium text-sm cursor-pointer appearance-none truncate">
          <option>Any Budget</option>
          <option>Under ₹25,000</option>
          <option>₹25,000 – ₹50,000</option>
          <option>₹50,000 – ₹1,00,000</option>
          <option>Above ₹1,00,000</option>
        </select>
      </div>
    </div>
  );
};
export default BudgetField;