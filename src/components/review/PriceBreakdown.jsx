import React from 'react';
import { IndianRupee, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { activities as allActivities } from '../../data/activities';
import { places as allPlaces } from '../../data/places';

const HOTEL_META = {
  standard: { label: 'Standard Stay', extra: 0 },
  premium:  { label: 'Premium Stay',  extra: 15000 },
  luxury:   { label: 'Luxury Stay',   extra: 35000 },
};
const TRANSPORT_META = {
  shared:  { label: 'Shared Transfer', extra: 0 },
  private: { label: 'Private Cab',     extra: 8000 },
  self:    { label: 'Self Drive',      extra: 12000 },
};

export const PriceBreakdown = ({ pkg, hotel, transport, selectedActivities, selectedPlaces, estimatedTotal }) => {
  const hotelMeta     = HOTEL_META[hotel]     ?? HOTEL_META.standard;
  const transportMeta = TRANSPORT_META[transport] ?? TRANSPORT_META.shared;

  const activityCost = selectedActivities.reduce((sum, id) => {
    const act = allActivities.find(a => a.id === id);
    return sum + (act?.price || 0);
  }, 0);

  const placeCost = selectedPlaces.reduce((sum, id) => {
    const place = allPlaces.find(p => p.id === id);
    return sum + (place?.price || 0);
  }, 0);

  const Row = ({ label, value, isTotal = false, isInc = false }) => (
    <div className={`flex justify-between items-center py-2.5 ${isTotal ? 'border-t-2 border-gray-200 mt-2 pt-4' : 'border-b border-gray-50'}`}>
      <span className={`text-sm ${isTotal ? 'font-bold text-gray-900 text-base' : 'text-gray-600'}`}>
        {label}
      </span>
      <span className={`font-bold ${isTotal ? 'text-gray-900 text-xl' : isInc ? 'text-green-600' : 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <IndianRupee className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-gray-900">Price Breakdown</h3>
      </div>

      <Row label={`${pkg?.name} (Base Package)`} value={`₹${(pkg?.price || 0).toLocaleString('en-IN')}`} />

      {hotelMeta.extra > 0 && (
        <Row label={hotelMeta.label} value={`+₹${hotelMeta.extra.toLocaleString('en-IN')}`} />
      )}
      {transportMeta.extra > 0 && (
        <Row label={transportMeta.label} value={`+₹${transportMeta.extra.toLocaleString('en-IN')}`} />
      )}
      {activityCost > 0 && (
        <Row label="Selected Experiences" value={`+₹${activityCost.toLocaleString('en-IN')}`} />
      )}
      {placeCost > 0 && (
        <Row label="Selected Places (Paid)" value={`+₹${placeCost.toLocaleString('en-IN')}`} />
      )}

      <Row label="Estimated Total" value={`₹${estimatedTotal.toLocaleString('en-IN')}`} isTotal />

      <div className="mt-4 flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
        <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <p>Final pricing will be confirmed by our travel team after reviewing availability.</p>
      </div>
    </motion.div>
  );
};
