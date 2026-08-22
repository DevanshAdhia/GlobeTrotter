import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

const PackagePricing = ({ pkg, adults, children, date }) => {
  const navigate = useNavigate();

  const total = useMemo(() => {
    const aPrice = pkg.startingPrice || 0;
    const cPrice = pkg.childPrice || (aPrice * 0.75); // Fallback if no child price
    return (adults * aPrice) + (children * cPrice);
  }, [pkg, adults, children]);

  const handlePlanTrip = () => {
    // Navigate with state
    navigate(`/plan-your-trip?package=${pkg.slug}&date=${date}&adults=${adults}&children=${children}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden sticky top-24">
      <div className="p-6 bg-[#0a192f] text-white">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{pkg.name}</h3>
        <p className="text-primary-light font-medium text-sm">{pkg.duration} • {pkg.nights} Nights</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Estimated Total</p>
            <div className="flex items-center text-3xl font-bold text-gray-900">
              <IndianRupee className="w-6 h-6 text-gray-600" />
              {total.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            For {adults + children} Traveller{adults + children > 1 ? 's' : ''}
          </div>
        </div>

        <button 
          onClick={handlePlanTrip}
          disabled={!date}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 mb-4"
        >
          {date ? 'Plan This Trip' : 'Select Date to Plan'}
        </button>

        <button 
          onClick={() => navigate(`/contact?package=${pkg.slug}`)}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-lg font-bold py-3.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-200 mb-6"
        >
          Talk to an Expert
        </button>
        
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Final price may vary depending on travel dates, availability, hotel selection and customizations.
        </p>
      </div>
    </div>
  );
};
export default PackagePricing;