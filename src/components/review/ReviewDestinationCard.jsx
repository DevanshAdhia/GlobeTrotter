import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ReviewDestinationCard = ({ destination, onChangeDestination }) => {
  const navigate = useNavigate();

  if (!destination) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Destination</span>
          </div>
          <h3 className="text-2xl font-bold">{destination.name}</h3>
        </div>
      </div>
      <div className="p-5 flex items-start justify-between gap-4">
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{destination.description}</p>
        <button
          onClick={onChangeDestination}
          aria-label={`Change destination from ${destination.name}`}
          className="shrink-0 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          Change
        </button>
      </div>
    </motion.div>
  );
};
