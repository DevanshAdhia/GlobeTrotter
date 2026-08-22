import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const filterOptions = {
  region: ['North India', 'South India', 'West India', 'East India', 'Central India', 'Northeast India'],
  travelType: ['Family', 'Honeymoon', 'Adventure', 'Luxury', 'Beach', 'Hill Station', 'Spiritual', 'Wildlife'],
  duration: ['1–3 Days', '4–6 Days', '7–10 Days', '10+ Days'],
  budget: ['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000'],
  bestFor: ['Families', 'Couples', 'Friends', 'Solo', 'Senior Citizens'],
  season: ['Summer', 'Monsoon', 'Winter', 'All Year']
};

const DestinationFilters = ({ activeFilters, onFilterChange, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { if (isOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => document.body.style.overflow = ''; }, [isOpen]);

  const handleToggle = (key, val) => {
    const current = activeFilters[key] || [];
    const updated = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
    onFilterChange(key, updated);
  };

  const FilterSection = ({ title, filterKey, options }) => (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = (activeFilters[filterKey] || []).includes(opt);
          return (
            <button key={opt} onClick={() => handleToggle(filterKey, opt)} aria-pressed={isSelected}
              className={clsx('px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
                isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
              )}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="lg:hidden flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 font-medium text-gray-700 shadow-sm">
        <Filter className="w-4 h-4 mr-2" /> Filters
      </button>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center"><Filter className="w-5 h-5 mr-2 text-primary" /> Filters</h3>
            <button onClick={onClearAll} className="text-sm font-medium text-primary hover:text-primary-dark">Clear All</button>
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            <FilterSection title="Region" filterKey="region" options={filterOptions.region} />
            <FilterSection title="Travel Type" filterKey="travelType" options={filterOptions.travelType} />
            <FilterSection title="Duration" filterKey="duration" options={filterOptions.duration} />
            <FilterSection title="Budget" filterKey="budget" options={filterOptions.budget} />
            <FilterSection title="Best For" filterKey="bestFor" options={filterOptions.bestFor} />
            <FilterSection title="Season" filterKey="season" options={filterOptions.season} />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl lg:hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setIsOpen(false)} aria-label="Close filters" className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterSection title="Region" filterKey="region" options={filterOptions.region} />
                <FilterSection title="Travel Type" filterKey="travelType" options={filterOptions.travelType} />
                <FilterSection title="Duration" filterKey="duration" options={filterOptions.duration} />
                <FilterSection title="Budget" filterKey="budget" options={filterOptions.budget} />
                <FilterSection title="Best For" filterKey="bestFor" options={filterOptions.bestFor} />
                <FilterSection title="Season" filterKey="season" options={filterOptions.season} />
              </div>
              <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
                <button onClick={onClearAll} className="flex-1 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Clear All</button>
                <button onClick={() => setIsOpen(false)} className="flex-1 py-3 font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark">Apply Filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default DestinationFilters;