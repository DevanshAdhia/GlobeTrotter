import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationStickyCTA = ({ destination }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled past the hero section (approx 600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-safe">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="hidden sm:block">
              <h4 className="font-bold text-gray-900">{destination.name}</h4>
              <p className="text-xs text-gray-500 font-medium">Starting from {destination.currency}{destination.startingPrice.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <div className="sm:hidden flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Starting from</span>
                <span className="font-bold text-gray-900">{destination.currency}{destination.startingPrice.toLocaleString('en-IN')}</span>
              </div>
              <Link to={`/plan-your-trip?destination=${destination.slug}`} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                Plan This Trip
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default DestinationStickyCTA;