import React from 'react';
import Container from '../common/Container';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WeekendPlanningCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0a192f] mt-16 rounded-3xl mx-4 lg:mx-8 mb-12">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1533587851505-d119e13bf0b5?w=1600&q=80" alt="Adventure landscape" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-6">
          Make Your Weekend Count
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-white/80 mb-10">
          Tell us what kind of escape you're looking for and we'll help you plan it.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/plan" className="bg-primary text-white hover:bg-primary-dark px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
            Plan My Trip
          </Link>
          <Link to="/contact" className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default WeekendPlanningCTA;