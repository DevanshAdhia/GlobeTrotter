import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

const PackagePlanningCTA = ({ pkg, adults, children, date }) => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-[#003380] via-[#0047b3] to-[#1a66ff] rounded-3xl mb-12 shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6 border border-white/20 text-accent"
        >
          <Sparkles className="w-4 h-4" />
          <span>Craft Your Dream Vacation</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Ready to Explore {pkg.name}?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tell us your preferred dates and travel group. We'll build a tailored itinerary with premium hotel choices and curated activities.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to={`/plan-your-trip/${pkg.destinationSlug}/${pkg.slug}?date=${date}&adults=${adults}&children=${children}`} 
            className="w-full sm:w-auto bg-white text-primary hover:bg-amber-400 hover:text-gray-900 px-8 py-4 rounded-2xl font-extrabold text-base transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <span>Plan & Customize This Trip</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to={`/contact?package=${pkg.slug}`} 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Speak to Travel Specialist</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default PackagePlanningCTA;