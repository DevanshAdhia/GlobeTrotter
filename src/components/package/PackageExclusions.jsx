import React from 'react';
import { X } from 'lucide-react';

const PackageExclusions = ({ exclusions }) => {
  if (!exclusions || exclusions.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Not Included</h2>
      <div className="bg-red-50/50 p-6 sm:p-8 rounded-2xl border border-red-100">
        <ul className="space-y-4">
          {exclusions.map((item, i) => (
            <li key={i} className="flex items-start text-red-800">
              <X className="w-5 h-5 mr-3 mt-0.5 text-red-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default PackageExclusions;