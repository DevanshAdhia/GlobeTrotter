import React, { useState, useEffect } from 'react';
import { Filter, X, Check, RotateCcw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const filterOptions = {
  region: ['Middle East', 'Southeast Asia', 'South Asia', 'East Asia', 'Europe', 'Africa', 'Australia & New Zealand', 'Americas'],
  country: ['UAE', 'Singapore', 'Thailand', 'Indonesia', 'Maldives', 'Vietnam', 'Malaysia', 'Sri Lanka', 'Japan', 'Australia', 'France', 'Italy', 'Switzerland'],
  travelType: ['Beach', 'City', 'Adventure', 'Luxury', 'Family', 'Honeymoon', 'Shopping', 'Wildlife', 'Culture', 'Cruise'],
  duration: ['3–5 Days', '6–8 Days', '9–12 Days', '13–15 Days', '15+ Days'],
  budget: ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', 'Above ₹2,00,000'],
  bestFor: ['Couples', 'Families', 'Friends', 'Solo', 'Luxury Travellers', 'Honeymoon'],
  season: ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter', 'Year Round'],
  visa: ['Visa Free', 'Visa on Arrival', 'eVisa', 'Visa Required']
};

const InternationalFilters = ({ activeFilters = {}, onFilterChange, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { 
    if (isOpen) document.body.style.overflow = 'hidden'; 
    else document.body.style.overflow = ''; 
    return () => { document.body.style.overflow = ''; }; 
  }, [isOpen]);

  const totalActiveCount = Object.values(activeFilters || {}).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 
    0
  );

  const handleToggle = (key, val) => {
    const current = activeFilters[key] || [];
    const updated = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
    onFilterChange(key, updated);
  };

  const FilterSection = ({ title, filterKey, options, helperText }) => {
    const activeCount = (activeFilters[filterKey] || []).length;
    return (
      <div className="mb-6 pb-5 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
            <span>{title}</span>
          </h4>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {helperText && <p className="text-[11px] text-gray-500 mb-3 flex items-start"><Info className="w-3.5 h-3.5 mr-1 mt-0.5 shrink-0 text-primary" /> {helperText}</p>}
        <div className="flex flex-wrap gap-2">
          {options.map(opt => {
            const isSelected = (activeFilters[filterKey] || []).includes(opt);
            return (
              <button 
                key={opt} 
                onClick={() => handleToggle(filterKey, opt)} 
                aria-pressed={isSelected}
                className={clsx(
                  'filter-pill-button',
                  isSelected ? 'filter-pill-active' : 'filter-pill-inactive'
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-white stroke-[3]" />}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="lg:hidden flex items-center justify-between w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 font-bold text-gray-800 shadow-sm mb-4"
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-primary" />
          <span>Filters</span>
        </div>
        {totalActiveCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-extrabold">
            {totalActiveCount} Active
          </span>
        )}
      </button>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/90 p-6 sticky top-24">
          <div className="flex justify-between items-center pb-4 mb-5 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900 leading-none">Filters</h3>
                {totalActiveCount > 0 && (
                  <span className="text-[11px] font-bold text-primary">{totalActiveCount} selected</span>
                )}
              </div>
            </div>

            {totalActiveCount > 0 && (
              <button 
                onClick={onClearAll} 
                className="inline-flex items-center space-x-1 text-xs font-extrabold text-rose-500 hover:text-rose-600 transition-colors bg-rose-50 hover:bg-rose-100/70 px-2.5 py-1 rounded-lg"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1.5 custom-scrollbar space-y-1">
            <FilterSection title="Region" filterKey="region" options={filterOptions.region} />
            <FilterSection title="Country" filterKey="country" options={filterOptions.country} />
            <FilterSection title="Travel Type" filterKey="travelType" options={filterOptions.travelType} />
            <FilterSection title="Duration" filterKey="duration" options={filterOptions.duration} />
            <FilterSection title="Budget" filterKey="budget" options={filterOptions.budget} />
            <FilterSection title="Best For" filterKey="bestFor" options={filterOptions.bestFor} />
            <FilterSection title="Best Season" filterKey="season" options={filterOptions.season} />
            <FilterSection title="Visa" filterKey="visa" options={filterOptions.visa} helperText="Visa requirements can change. Verify before travel." />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-extrabold text-gray-900">Filter International</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  aria-label="Close filters" 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-2">
                <FilterSection title="Region" filterKey="region" options={filterOptions.region} />
                <FilterSection title="Country" filterKey="country" options={filterOptions.country} />
                <FilterSection title="Travel Type" filterKey="travelType" options={filterOptions.travelType} />
                <FilterSection title="Duration" filterKey="duration" options={filterOptions.duration} />
                <FilterSection title="Budget" filterKey="budget" options={filterOptions.budget} />
                <FilterSection title="Best For" filterKey="bestFor" options={filterOptions.bestFor} />
                <FilterSection title="Best Season" filterKey="season" options={filterOptions.season} />
                <FilterSection title="Visa" filterKey="visa" options={filterOptions.visa} helperText="Visa requirements can change. Verify before travel." />
              </div>

              <div className="p-5 border-t border-gray-100 flex gap-3 bg-white">
                <button 
                  onClick={onClearAll} 
                  className="flex-1 py-3 font-extrabold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Reset All
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 py-3 font-extrabold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-md shadow-primary/20 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InternationalFilters;