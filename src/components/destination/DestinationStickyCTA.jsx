import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationStickyCTA = ({ destination }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!destination) return null;

  const currencySym = destination.currency || '₹';
  const priceVal = (destination.startingPrice || 69999).toLocaleString('en-IN');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }} 
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.12)] py-3 px-4 md:px-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <h4 className="font-extrabold text-gray-900 text-base">{destination.name}</h4>
              <p className="text-xs text-gray-500 font-medium">Starting from {currencySym}{priceVal} / person</p>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <div className="sm:hidden flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Starting from</span>
                <span className="font-extrabold text-gray-900 text-sm">{currencySym}{priceVal}</span>
              </div>

              <Link 
                to={`/plan-your-trip/${destination.slug || 'australia'}/australia-highlights`} 
                className="bg-[#002b5e] hover:bg-blue-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md text-center whitespace-nowrap"
              >
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