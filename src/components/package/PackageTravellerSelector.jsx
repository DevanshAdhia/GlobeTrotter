import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';

const PackageTravellerSelector = ({ adults, setAdults, children, setChildren }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex items-center text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
        <Users className="w-4 h-4 mr-2" /> Travellers
      </div>
      
      <div className="space-y-4">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900">Adults</p>
            <p className="text-xs text-gray-500">12+ years</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAdults(Math.max(1, adults - 1))}
              disabled={adults <= 1}
              aria-label="Decrease adults"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-4 text-center font-bold">{adults}</span>
            <button 
              onClick={() => setAdults(adults + 1)}
              aria-label="Increase adults"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900">Children</p>
            <p className="text-xs text-gray-500">2-11 years</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setChildren(Math.max(0, children - 1))}
              disabled={children <= 0}
              aria-label="Decrease children"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-4 text-center font-bold">{children}</span>
            <button 
              onClick={() => setChildren(children + 1)}
              aria-label="Increase children"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PackageTravellerSelector;