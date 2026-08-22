import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DestinationPlanningCTA = ({ destination }) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#0a192f] rounded-3xl mb-12">
      <div className="absolute inset-0">
        <img src={destination.heroImage} alt="Background" className="w-full h-full object-cover opacity-20 blur-sm scale-105" />
        <div className="absolute inset-0 bg-[#0a192f]/80 mix-blend-multiply"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Plan Your Trip to {destination.name}?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-white/80 mb-10">
          Tell us your travel dates and preferences and we'll help you plan the right experience.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/plan-your-trip?destination=${destination.slug}`} className="bg-primary text-white hover:bg-primary-dark px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg text-center">
            Plan This Trip
          </Link>
          <Link to={`/contact?destination=${destination.slug}`} className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors text-center">
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default DestinationPlanningCTA;