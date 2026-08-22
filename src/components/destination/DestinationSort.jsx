import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const DestinationSort = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1 hover:border-gray-300 transition-colors">
      <label htmlFor="dest-sort" className="sr-only">Sort by</label>
      <ArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
      <select id="dest-sort" value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none py-2 cursor-pointer appearance-none pr-6">
        <option value="recommended">Recommended</option>
        <option value="popular">Most Popular</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="duration-asc">Duration: Short to Long</option>
        <option value="duration-desc">Duration: Long to Short</option>
      </select>
    </div>
  );
};
export default DestinationSort;