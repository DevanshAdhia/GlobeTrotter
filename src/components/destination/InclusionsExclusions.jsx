import React from 'react';
import { Check, X } from 'lucide-react';

const InclusionsExclusions = ({ inclusions, exclusions }) => {
  if (!inclusions?.length && !exclusions?.length) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {/* Inclusions */}
        {inclusions?.length > 0 && (
          <div className="bg-green-50/50 p-6 sm:p-8 rounded-2xl border border-green-100">
            <h3 className="text-lg font-bold text-green-900 mb-6 flex items-center">
              <div className="bg-green-100 p-1.5 rounded-full mr-3"><Check className="w-5 h-5 text-green-600" /></div>
              Generally Included
            </h3>
            <ul className="space-y-4">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start text-green-800">
                  <Check className="w-5 h-5 mr-3 mt-0.5 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {exclusions?.length > 0 && (
          <div className="bg-red-50/50 p-6 sm:p-8 rounded-2xl border border-red-100">
            <h3 className="text-lg font-bold text-red-900 mb-6 flex items-center">
              <div className="bg-red-100 p-1.5 rounded-full mr-3"><X className="w-5 h-5 text-red-600" /></div>
              Generally Excluded
            </h3>
            <ul className="space-y-4">
              {exclusions.map((item, i) => (
                <li key={i} className="flex items-start text-red-800">
                  <X className="w-5 h-5 mr-3 mt-0.5 text-red-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-4 italic text-center">
        Note: Exact inclusions/exclusions vary by selected package. Check individual package details before booking.
      </p>
    </section>
  );
};
export default InclusionsExclusions;