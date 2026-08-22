import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Clock, Plane } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { clsx } from 'clsx';

const InternationalDestinationCard = ({ destination }) => {
  const handleWishlist = (e) => {
    e.preventDefault();
    toast('Log in to save destinations.', { icon: '🔒' });
  };
  
  return (
    <motion.div whileHover={{ y: -4 }} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover transition-transform duration-500 xl:group-hover:scale-105" loading="lazy" />
        <button onClick={handleWishlist} aria-label={`Save ${destination.name}`} className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-sm z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{destination.country}</span>
            <h3 className="text-xl font-bold text-gray-900 mt-1 line-clamp-1">{destination.name}</h3>
          </div>
          <div className="flex items-center text-accent bg-accent/10 px-2 py-1 rounded text-sm font-semibold shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
            {destination.rating}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={clsx("text-xs font-medium px-2 py-1 rounded",
            destination.visaType === 'Visa Free' ? 'bg-green-100 text-green-700' :
            destination.visaType === 'Visa Required' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
          )}>{destination.visaType}</span>
          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600 flex items-center">
            <Plane className="w-3 h-3 mr-1" /> {destination.flightDuration}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4 mr-1.5" /> {destination.duration}
          <span className="mx-2">•</span>
          <span>{destination.packageCount} Packages</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase">Starting from</p>
            <p className="text-lg font-bold text-gray-900">₹{destination.startingPrice.toLocaleString('en-IN')}</p>
          </div>
          <Link to={`/destinations/${destination.slug}`} className="text-primary font-medium text-sm flex items-center group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1">
            Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform xl:group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default InternationalDestinationCard;