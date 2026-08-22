import React from 'react';
import { motion } from 'framer-motion';

const WeekendHero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <motion.img initial={{ scale: 1 }} animate={{ scale: 1.05 }} transition={{ duration: 15, ease: "linear" }} src="https://images.unsplash.com/photo-1602075432748-82d264e2b463?w=2000&q=80" alt="Relaxing weekend destination" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white mt-[-80px] lg:mt-[-120px]">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-primary-light font-bold tracking-widest text-sm uppercase mb-3">
            WEEKEND ESCAPES
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Perfect Weekend Starts Here
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Escape the routine and discover beautiful places for a refreshing short trip.
          </motion.p>
          {/* Action buttons hidden on desktop since planner overlaps, visible on mobile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 lg:hidden">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg">
              Find My Weekend Trip
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold transition-colors">
              Explore Destinations
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default WeekendHero;