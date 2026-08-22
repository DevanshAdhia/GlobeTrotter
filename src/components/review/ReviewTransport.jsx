import React from 'react';
import { Car, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const TRANSPORT_META = {
  shared:  { label: 'Shared Transfer', desc: 'Travel with other guests',            extra: null },
  private: { label: 'Private Cab',     desc: 'Dedicated AC vehicle for your group', extra: 8000 },
  self:    { label: 'Self Drive',      desc: 'Rental car at destination',           extra: 12000 },
};

export const ReviewTransport = ({ transport, onEdit }) => {
  const meta = TRANSPORT_META[transport] ?? TRANSPORT_META.shared;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.18 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-gray-900">Transport</h3>
        </div>
        <button
          onClick={onEdit}
          aria-label="Edit transport preference"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Transport
        </button>
      </div>

      <div className="flex items-center gap-4 bg-primary/5 rounded-xl p-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
          <Car className="w-6 h-6" />
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
