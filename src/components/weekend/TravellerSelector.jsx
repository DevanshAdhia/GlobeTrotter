import React, { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TravellerSelector = ({ adults, setAdults, children, setChildren, infants, setInfants }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const total = adults + children;
  const summary = `${total} Traveller${total > 1 ? 's' : ''}`;

  const Row = ({ label, desc, value, onMinus, onPlus, min = 0 }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={onMinus} disabled={value <= min} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary">
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-4 text-center font-medium text-gray-900">{value}</span>
        <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={onPlus} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative flex-1" ref={ref}>
      <label className="block truncate text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Travellers</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex items-center bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
        <Users className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-gray-900 font-medium">{summary}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 top-full right-0 lg:left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4">
            <Row label="Adults" desc="Ages 12 or above" value={adults} onMinus={() => setAdults(Math.max(1, adults - 1))} onPlus={() => setAdults(adults + 1)} min={1} />
            <Row label="Children" desc="Ages 2–11" value={children} onMinus={() => setChildren(Math.max(0, children - 1))} onPlus={() => setChildren(children + 1)} />
            <Row label="Infants" desc="Under 2" value={infants} onMinus={() => setInfants(Math.max(0, infants - 1))} onPlus={() => setInfants(infants + 1)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default TravellerSelector;