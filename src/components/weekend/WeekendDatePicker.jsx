import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, nextFriday, nextSunday, isPast, isToday } from 'date-fns';
import { clsx } from 'clsx';

const WeekendDatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleQuickSelect = (type) => {
    let start, end, label;
    const today = new Date();
    if (type === 'this') {
      start = nextFriday(today);
      if (isPast(start) || isToday(start)) start = today; // if today is friday/sat
      end = nextSunday(start);
      label = 'This Weekend';
    } else if (type === 'next') {
      start = nextFriday(addDays(today, 7));
      end = nextSunday(start);
      label = 'Next Weekend';
    } else if (type === '7days') {
      start = today;
      end = addDays(today, 7);
      label = 'Next 7 Days';
    }
    onChange(label);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1" ref={ref}>
      <label className="block truncate text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">When are you travelling?</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full text-left flex items-center bg-white border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>{value || 'Select dates'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 top-full mt-2 w-full lg:w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3">
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => handleQuickSelect('this')} className={clsx("text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors", value === 'This Weekend' ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-700 hover:bg-gray-100')}>This Weekend</button>
              <button type="button" onClick={() => handleQuickSelect('next')} className={clsx("text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors", value === 'Next Weekend' ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-700 hover:bg-gray-100')}>Next Weekend</button>
              <button type="button" onClick={() => handleQuickSelect('7days')} className={clsx("text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors", value === 'Next 7 Days' ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-700 hover:bg-gray-100')}>Next 7 Days</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default WeekendDatePicker;