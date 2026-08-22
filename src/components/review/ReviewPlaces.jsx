import React from 'react';
import { MapPin, Check, Edit3, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { places as allPlaces } from '../../data/places';

export const ReviewPlaces = ({ selectedPlaces, includedPlaces, destinationSlug, onEdit }) => {
  // Safety: only show places that belong to current destination
  const validIds = [...new Set([...includedPlaces, ...selectedPlaces])].filter(id => {
    const place = allPlaces.find(p => p.id === id);
    return place && place.destinationSlug === destinationSlug;
  });

  const resolvedPlaces = validIds
    .map(id => allPlaces.find(p => p.id === id))
    .filter(Boolean);

  const invalidCount = selectedPlaces.filter(id => {
    const place = allPlaces.find(p => p.id === id);
    return !place || place.destinationSlug !== destinationSlug;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.12 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">
            Places
            {resolvedPlaces.length > 0 && (
              <span className="ml-2 text-sm text-gray-400 font-normal">
                ({resolvedPlaces.length} selected)
              </span>
            )}
          </h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit selected places"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Places
        </button>
      </div>

      {invalidCount > 0 && (
        <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {invalidCount} previously selected {invalidCount === 1 ? 'place does' : 'places do'} not belong to this destination and {invalidCount === 1 ? 'has' : 'have'} been excluded.
        </div>
      )}

      {resolvedPlaces.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No additional places selected.</p>
      ) : (
        <div className="space-y-3">
          {resolvedPlaces.map((place, i) => (
            <div key={place.id} className="flex items-center gap-3">
              <img
                src={place.image}
                alt={place.name}
                className="w-16 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="font-semibold text-gray-900 truncate">{place.name}</span>
                  {includedPlaces.includes(place.id) && (
                    <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md shrink-0">
                      Included
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5 pl-6 text-xs text-gray-400">
                  <span>{place.category}</span>
                  <span>•</span>
                  <span>{place.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
