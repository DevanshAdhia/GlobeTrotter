import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, ShieldCheck, Zap, Calendar, Users, PhoneCall, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PackagePricing = ({ pkg, adults, children, date }) => {
  const navigate = useNavigate();

  const total = useMemo(() => {
    const aPrice = pkg.startingPrice || 0;
    const cPrice = pkg.childPrice || (aPrice * 0.75); // Fallback if no child price
    return (adults * aPrice) + (children * cPrice);
  }, [pkg, adults, children]);

  const handlePlanTrip = () => {
    navigate(`/plan-your-trip/${pkg.destinationSlug}/${pkg.slug}?date=${date}&adults=${adults}&children=${children}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden sticky top-24"
    >
      {/* Top Banner Header */}
      <div className="p-6 bg-gradient-to-br from-[#0a192f] via-[#0047b3] to-[#003380] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 rounded-full bg-white/5 pointer-events-none blur-xl" />
        <div className="flex items-center space-x-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Best Value Guaranteed
        </div>
        <h3 className="text-xl font-extrabold mb-1 line-clamp-1">{pkg.name}</h3>
        <p className="text-blue-200 font-medium text-xs flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1" /> {pkg.duration} ({pkg.nights} Nights Stay)
        </p>
      </div>
      
      <div className="p-6">
        {/* Price Box */}
        <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider block mb-1">Estimated Total</span>
            <div className="flex items-center text-3xl font-black text-gray-900 tracking-tight">
              <IndianRupee className="w-6 h-6 text-primary shrink-0" />
              {total.toLocaleString('en-IN')}
            </div>
            {pkg.startingPrice && (
              <span className="text-xs text-green-600 font-semibold flex items-center mt-1">
                <Zap className="w-3 h-3 mr-1 fill-green-500" /> Save ₹{Math.round(total * 0.15).toLocaleString('en-IN')} on early booking
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-primary">
              <Users className="w-3 h-3 mr-1" /> {adults + children} Guest{adults + children > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <button 
          onClick={handlePlanTrip}
          disabled={!date}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-base font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 mb-3 flex items-center justify-center space-x-2"
        >
          <span>{date ? 'Plan & Customize This Trip' : 'Select Departure Date'}</span>
        </button>

        <button 
          onClick={() => navigate(`/contact?package=${pkg.slug}`)}
          className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-bold py-3 rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 mb-6 flex items-center justify-center space-x-2"
        >
          <PhoneCall className="w-4 h-4 text-gray-500" />
          <span>Speak to Travel Expert</span>
        </button>
        
        {/* Trust Indicators */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500 mr-2 shrink-0" />
            <span>100% Customisable & Flexible Itinerary</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Zap className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
            <span>Instant Confirmation & Easy Cancellation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default PackagePricing;