import React from 'react';
import { Hotel, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const HOTEL_META = {
  standard: { label: 'Standard Stay', desc: 'Comfortable 3-star accommodation', badge: '3★', extra: null },
  premium:  { label: 'Premium Stay',  desc: 'Excellent 4-star accommodation',   badge: '4★', extra: 15000 },
  luxury:   { label: 'Luxury Stay',   desc: 'Exceptional 5-star accommodation', badge: '5★', extra: 35000 },
};

export const ReviewHotel = ({ hotel, onEdit }) => {
  const meta = HOTEL_META[hotel] ?? HOTEL_META.standard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.16 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Hotel className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Stay Preference</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit stay preference"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Stay
        </button>
      </div>

      <div className="flex items-center gap-4 bg-primary/5 rounded-xl p-4">
        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
          {meta.badge}
        </div>
        <div>
          <p className="font-bold text-gray-900">{meta.label}</p>
          <p className="text-sm text-gray-500">{meta.desc}</p>
        </div>
        <div className="ml-auto text-right">
          {meta.extra ? (
            <p className="font-bold text-gray-900 text-sm">+₹{meta.extra.toLocaleString('en-IN')}</p>
          ) : (
            <p className="font-bold text-green-600 text-sm">Included</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
