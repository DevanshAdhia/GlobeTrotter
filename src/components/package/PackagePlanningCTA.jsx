import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PackagePlanningCTA = ({ pkg, adults, children, date }) => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-primary rounded-3xl mb-12">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Plan Your Trip?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
          Tell us your dates and preferences and we'll help you create the right travel plan for {pkg.name}.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={`/plan-your-trip?package=${pkg.slug}&date=${date}&adults=${adults}&children=${children}`} 
            className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg text-center"
          >
            Plan This Trip
          </Link>
          <Link 
            to={`/contact?package=${pkg.slug}`} 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors text-center"
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default PackagePlanningCTA;