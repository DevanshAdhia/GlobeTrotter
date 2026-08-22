import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PackageOverview = ({ overview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!overview) return null;
  const isLong = overview.length > 200;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
      <div className="relative">
        <motion.div initial={false} animate={{ height: isExpanded || !isLong ? 'auto' : '80px' }} className="overflow-hidden text-gray-700 leading-relaxed text-lg relative">
          <p>{overview}</p>
          {!isExpanded && isLong && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </motion.div>
        
        {isLong && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-primary font-bold focus:outline-none focus-visible:underline hover:text-primary-dark">
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </section>
  );
};
export default PackageOverview;