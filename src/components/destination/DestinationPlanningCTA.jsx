import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DestinationPlanningCTA = ({ destination }) => {
  if (!destination) return null;
  const bgImg = destination.heroImage || (destination.image && destination.image[0]) || 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600';

  return (
    <section className="mt-16 mb-12 py-16 md:py-20 relative overflow-hidden bg-[#001d42] rounded-3xl shadow-xl">
      <div className="absolute inset-0">
        <img src={bgImg} alt="Background" className="w-full h-full object-cover opacity-25 blur-sm scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001d42] via-[#002b5e]/90 to-[#001d42]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-4 inline-block">
          Personalized Itinerary Design
        </motion.span>
        
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          Ready to Plan Your Trip to {destination.name}?
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-blue-100/90 mb-8 max-w-2xl mx-auto">
          Tell us your travel dates and preferences. Our travel specialists will craft a customized itinerary for you.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/plan-your-trip/${destination.slug || 'australia'}/australia-highlights`} className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-gray-900 px-8 py-4 rounded-xl font-extrabold text-sm transition-all shadow-lg text-center">
            Plan Custom Itinerary
          </Link>
          <Link to={`/contact?destination=${destination.slug}`} className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all text-center">
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationPlanningCTA;