import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, IndianRupee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationPackageCard = ({ pkg }) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 xl:group-hover:scale-105" loading="lazy" />
        {pkg.featured && (
          <div className="absolute top-4 left-4 bg-accent text-accent-dark px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{pkg.name}</h3>
          <div className="flex items-center text-accent bg-accent/10 px-2 py-1 rounded text-sm font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
            {pkg.rating}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="w-4 h-4 mr-1.5 text-primary" /> {pkg.duration}
        </div>
        
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="mb-5 flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Highlights</p>
            <ul className="space-y-1.5">
              {pkg.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start text-sm text-gray-700">
                  <MapPin className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 shrink-0" />
                  <span className="line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase">Starting from</p>
            <p className="text-lg font-bold text-gray-900 flex items-center">
              <IndianRupee className="w-4 h-4 mr-0.5 text-gray-600" />
              {pkg.startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-gray-500 ml-1">/person</span>
            </p>
          </div>
          
          <Link to={`/packages/${pkg.slug}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            View <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default DestinationPackageCard;