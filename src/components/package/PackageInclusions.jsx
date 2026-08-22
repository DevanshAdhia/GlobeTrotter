import React from 'react';
import { Check } from 'lucide-react';

const PackageInclusions = ({ inclusions }) => {
  if (!inclusions || inclusions.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
      <div className="bg-green-50/50 p-6 sm:p-8 rounded-2xl border border-green-100">
        <ul className="space-y-4">
          {inclusions.map((item, i) => (
            <li key={i} className="flex items-start text-green-800">
              <Check className="w-5 h-5 mr-3 mt-0.5 text-green-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default PackageInclusions;