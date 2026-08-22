import React from 'react';
import { Car, Plane, Train } from 'lucide-react';

const PackageTravelOptions = ({ options }) => {
  if (!options || options.length === 0) return null;

  const getIcon = (opt) => {
    const l = opt.toLowerCase();
    if (l.includes('flight') || l.includes('air')) return Plane;
    if (l.includes('train')) return Train;
    return Car;
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Transport Options</h2>
      <div className="flex flex-wrap gap-4">
        {options.map((opt, i) => {
          const Icon = getIcon(opt);
          return (
            <div key={i} className="flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Icon className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-800 font-medium">{opt}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default PackageTravelOptions;