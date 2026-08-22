import React from 'react';
import { Calendar, Edit3, ArrowRight } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { motion } from 'framer-motion';
import { getReturnDate } from '../../utils/dateUtils';

export const ReviewTravelDates = ({ departureDate, duration, onEdit }) => {
  const returnDate = getReturnDate(departureDate, duration);
  const depValid   = departureDate && isValid(new Date(departureDate));
  const retValid   = returnDate && isValid(returnDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.08 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Travel Dates</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit travel dates"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Dates
        </button>
      </div>

      {depValid ? (
        <div className="flex items-center gap-4">
          <div className="bg-primary/5 rounded-xl p-4 text-center flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Departure</p>
            <p className="text-lg font-bold text-gray-900">
              {format(new Date(departureDate), 'dd MMM yyyy')}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 shrink-0" />
          <div className="bg-primary/5 rounded-xl p-4 text-center flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Return</p>
            <p className="text-lg font-bold text-gray-900">
              {retValid ? format(returnDate, 'dd MMM yyyy') : '—'}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-amber-600 font-medium bg-amber-50 px-4 py-3 rounded-xl">
          ⚠️ No departure date selected. Please edit dates.
        </p>
      )}

      {duration && (
        <p className="text-xs text-gray-400 font-semibold mt-3 text-center">{duration}</p>
      )}
    </motion.div>
  );
};
