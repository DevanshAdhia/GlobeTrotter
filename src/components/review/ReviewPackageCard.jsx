import React from 'react';
import { Star, Clock, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewPackageCard = ({ pkg, destination, onEdit }) => {
  if (!pkg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.04 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-0">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full sm:w-44 h-40 sm:h-auto object-cover shrink-0"
        />
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                {destination?.name}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
            </div>
            <button
              onClick={onEdit}
              aria-label="Edit package selection"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-4 h-4 fill-current" />
              {pkg.rating}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400 uppercase font-semibold block mb-0.5">Base Price</span>
            <span className="text-xl font-bold text-gray-900">
              ₹{pkg.price?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
