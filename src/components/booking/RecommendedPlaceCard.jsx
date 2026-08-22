import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const RecommendedPlaceCard = ({ place, isSelected, isIncluded, onToggle }) => {
  return (
    <motion.div 
      whileHover={!isIncluded ? { y: -4, scale: 1.01 } : {}}
      className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white flex flex-col h-full
        ${isSelected || isIncluded ? 'border-primary shadow-md' : 'border-gray-100 shadow-sm hover:shadow-lg'}`}
    >
      <div className="aspect-[4/3] relative shrink-0">
        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
          {place.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-gray-900 mb-1">{place.name}</h4>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">{place.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded">
            {place.duration}
          </span>
          
          {isIncluded ? (
            <span className="text-primary text-xs font-bold flex items-center bg-primary/10 px-3 py-1.5 rounded-lg">
              <Check className="w-3.5 h-3.5 mr-1" /> Included
            </span>
          ) : (
            <button
              onClick={() => onToggle(place.id)}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center justify-center
                ${isSelected 
                  ? 'bg-primary text-white hover:bg-red-500 hover:text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              aria-label={isSelected ? `Remove ${place.name}` : `Add ${place.name}`}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 group-hover:hidden" /> 
                  <span className="group-hover:hidden">Added</span>
                </>
              ) : 'Add to Trip'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
