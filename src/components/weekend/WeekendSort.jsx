import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const WeekendSort = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1 hover:border-gray-300 transition-colors">
      <label htmlFor="we-sort" className="sr-only">Sort destinations</label>
      <ArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
      <select id="we-sort" value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none py-1.5 cursor-pointer appearance-none pr-6">
        <option value="recommended">Recommended</option>
        <option value="popular">Most Popular</option>
        <option value="travel-time">Shortest Travel Time</option>
        <option value="price-asc">Lowest Price</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
};
export default WeekendSort;