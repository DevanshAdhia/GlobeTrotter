import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PackageSummary = ({ pkg, destination }) => {
  const navigate = useNavigate();
  
  if (!pkg || !destination) return null;

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start mb-10">
      <img 
        src={pkg.image} 
        alt={pkg.name} 
        className="w-full md:w-48 h-32 object-cover rounded-xl"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {destination.name}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-2">{pkg.name}</h2>
          </div>
          <div className="flex items-center bg-accent/10 text-accent px-2 py-1 rounded text-sm font-bold">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {pkg.rating}
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <p>{pkg.duration}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Starting from</p>
            <p className="text-xl font-bold text-gray-900">₹{pkg.price.toLocaleString('en-IN')}</p>
          </div>
          <button 
            onClick={() => navigate(`/packages/${pkg.slug}`)}
            className="text-primary font-semibold text-sm hover:underline"
          >
            Change Package
          </button>
        </div>
      </div>
    </div>
  );
};
