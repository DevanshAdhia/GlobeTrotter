import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, IndianRupee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationPackageCard = ({ pkg }) => {
  if (!pkg) return null;
  const startingPrice = pkg.startingPrice || pkg.price || 49999;
  const pkgRating = pkg.rating || 4.8;
  const pkgTitle = pkg.title || pkg.name || 'Tour Package';
  const pkgDuration = pkg.duration || '6 Days / 5 Nights';
  const pkgImage = pkg.image || 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800';

  return (
    <motion.div whileHover={{ y: -4 }} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={pkgImage} alt={pkgTitle} className="w-full h-full object-cover transition-transform duration-500 xl:group-hover:scale-105" loading="lazy" />
        {pkg.featured && (
          <div className="absolute top-4 left-4 bg-amber-400 text-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{pkgTitle}</h3>
          <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded text-xs font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 mr-1 fill-current text-amber-400" />
            {pkgRating}
          </div>
        </div>
        
        <div className="flex items-center text-xs font-medium text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1.5 text-primary" /> {pkgDuration}
        </div>
        
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="mb-5 flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Highlights</p>
            <ul className="space-y-1.5">
              {pkg.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 mr-2 mt-0.5 text-gray-400 shrink-0" />
                  <span className="line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Starting from</p>
            <p className="text-base font-extrabold text-gray-900 flex items-center">
              <IndianRupee className="w-4 h-4 mr-0.5 text-emerald-600" />
              {startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-gray-500 ml-1">/person</span>
            </p>
          </div>
          
          <Link 
            to={`/plan-your-trip/${pkg.destinationSlug || 'australia'}/${pkg.slug || 'australia-highlights'}`} 
            className="bg-[#002b5e] text-white hover:bg-blue-900 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center shadow-sm"
          >
            Explore <ArrowRight className="w-3.5 h-3.5 ml-1 text-amber-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationPackageCard;