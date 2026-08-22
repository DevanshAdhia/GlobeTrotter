import React from 'react';
import { Users, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewTravellers = ({ adults, children, rooms, childAges, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.1 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Travellers</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit travellers"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Travellers
        </button>
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-100">
        <div className="text-center px-2">
          <p className="text-2xl font-bold text-gray-900">{adults}</p>
          <p className="text-xs text-gray-400 font-semibold uppercase mt-1">
            {adults === 1 ? 'Adult' : 'Adults'}
          </p>
        </div>
        <div className="text-center px-2">
          <p className="text-2xl font-bold text-gray-900">{children}</p>
          <p className="text-xs text-gray-400 font-semibold uppercase mt-1">
            {children === 1 ? 'Child' : 'Children'}
          </p>
        </div>
        <div className="text-center px-2">
          <p className="text-2xl font-bold text-gray-900">{rooms}</p>
          <p className="text-xs text-gray-400 font-semibold uppercase mt-1">
            {rooms === 1 ? 'Room' : 'Rooms'}
          </p>
        </div>
      </div>

      {children > 0 && childAges?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Child Ages</p>
          <div className="flex flex-wrap gap-2">
            {childAges.slice(0, children).map((age, i) => (
              <span key={i} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700">
                Child {i + 1} — {age} {Number(age) === 1 ? 'yr' : 'yrs'}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
