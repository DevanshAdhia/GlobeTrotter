import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PackageStickyCTA = ({ pkg, adults, children, date }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile sticky CTA when scrolled past the hero section
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate estimated price based on travellers if data available, else starting price
  const estimatedPrice = (adults * (pkg.startingPrice || 0)) + (children * (pkg.childPrice || 0)) || pkg.startingPrice;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] pb-safe">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Starting from</span>
              <span className="font-bold text-gray-900 text-lg leading-none">{pkg.currency}{estimatedPrice.toLocaleString('en-IN')} <span className="text-xs text-gray-500 font-normal">total</span></span>
            </div>
            <Link 
              to={`/plan-your-trip/${pkg.destinationSlug}/${pkg.slug}?date=${date}&adults=${adults}&children=${children}`} 
              className={`px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-md focus:outline-none ${date ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-gray-800 text-white'}`}
            >
              {date ? 'Plan This Trip' : 'Plan Trip'}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default PackageStickyCTA;