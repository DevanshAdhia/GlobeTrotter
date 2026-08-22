import React from 'react';
import { motion } from 'framer-motion';

const InternationalHero = () => {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <motion.img initial={{ scale: 1 }} animate={{ scale: 1.05 }} transition={{ duration: 15, ease: "linear" }} src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&q=80" alt="International Travel" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-primary-light font-bold tracking-widest text-sm uppercase mb-3">
            INTERNATIONAL JOURNEYS
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover the World
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            From relaxing island escapes to exciting city adventures, find a journey that matches the way you love to travel.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg">
              Explore International Packages
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-bold transition-colors">
              Plan My Trip
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default InternationalHero;