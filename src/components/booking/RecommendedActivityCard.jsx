import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';

export const RecommendedActivityCard = ({ activity, isIncluded, isSelected, onToggle }) => {
  return (
    <motion.div 
      whileHover={!isIncluded ? { y: -4, scale: 1.01 } : {}}
      className={`relative rounded-2xl overflow-hidden flex flex-col md:flex-row border-2 transition-all duration-300 bg-white
        ${isSelected || isIncluded ? 'border-primary shadow-md' : 'border-gray-100 shadow-sm hover:shadow-lg'}`}
    >
      <div className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-full relative shrink-0">
        <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-gray-900">{activity.name}</h4>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {activity.category}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {activity.duration}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-lg text-gray-900">
            {activity.price === 0 ? 'Free' : `+ ₹${activity.price.toLocaleString('en-IN')}`}
          </div>

          {isIncluded ? (
            <span className="text-primary text-sm font-bold flex items-center bg-primary/10 px-4 py-2 rounded-lg">
              <Check className="w-4 h-4 mr-1.5" /> Included
            </span>
          ) : (
            <button
              onClick={() => onToggle(activity.id)}
              className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center
                ${isSelected 
                  ? 'bg-primary text-white hover:bg-red-500 hover:text-white group' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              aria-label={isSelected ? `Remove ${activity.name}` : `Add ${activity.name}`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 group-hover:hidden" /> 
                  <span className="group-hover:hidden">Added</span>
                </>
              ) : 'Add'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
