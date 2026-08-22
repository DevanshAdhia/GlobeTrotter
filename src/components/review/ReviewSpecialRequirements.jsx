import React from 'react';
import { MessageSquare, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewSpecialRequirements = ({ requirements, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Special Requirements</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit special requirements"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit
        </button>
      </div>

      {requirements?.trim() ? (
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">
          {requirements}
        </p>
      ) : (
        <p className="text-sm text-gray-400 italic">No special requirements added.</p>
      )}
    </motion.div>
  );
};
