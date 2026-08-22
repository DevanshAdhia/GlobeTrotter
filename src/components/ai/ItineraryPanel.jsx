/**
 * components/ai/ItineraryPanel.jsx
 * Sticky sidebar / bottom-sheet showing saved items and the itinerary.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';

export const ItineraryPanel = () => {
  const { ctx, removeFromItinerary } = useTripContext();
  const [open, setOpen] = useState(false);

  const { itinerary, destinationName } = ctx;
  const count = itinerary.length;

  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between font-bold"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            My Trip ({count} places)
          </span>
          {open ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="overflow-hidden bg-white border-t border-gray-100 shadow-2xl"
            >
              <div className="max-h-80 overflow-y-auto p-4 space-y-2">
                <ItineraryList itinerary={itinerary} onRemove={removeFromItinerary} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block sticky top-24 w-72 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-blue-500 px-5 py-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-lg">My {destinationName} Trip</h3>
            </div>
            <p className="text-white/70 text-sm">{count} place{count !== 1 ? 's' : ''} added</p>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {count === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No places added yet.</p>
                <p className="text-xs mt-1">Click "Add to Trip" on any card.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <ItineraryList itinerary={itinerary} onRemove={removeFromItinerary} />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

const ItineraryList = ({ itinerary, onRemove }) => (
  <>
    {itinerary.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors"
      >
        <img src={item.image} alt={item.name} className="w-12 h-10 rounded-lg object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
          <p className="text-xs text-gray-400">{item.category} · {item.duration}</p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
          className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    ))}
  </>
);
