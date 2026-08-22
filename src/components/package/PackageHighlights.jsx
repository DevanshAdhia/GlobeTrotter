import React from 'react';
import { Check } from 'lucide-react';

const PackageHighlights = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="bg-primary/10 rounded-full p-1 mr-3 shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-gray-800 font-medium">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default PackageHighlights;