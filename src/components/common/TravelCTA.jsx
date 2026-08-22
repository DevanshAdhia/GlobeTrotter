import React from 'react';
import Container from './Container';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, PhoneCall } from 'lucide-react';

const TravelCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950">
      {/* Background overlay image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80" 
          alt="Airplane wing background" 
          className="w-full h-full object-cover opacity-15 mix-blend-overlay" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001d42] via-transparent to-[#001d42]/80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-amber-300 mb-6"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Start Your Unforgettable Journey</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Ready for Your Next Adventure?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Tell us where you want to go and our expert travel planners will craft the perfect itinerary for you.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link 
              to="/about" 
              className="w-full sm:w-auto bg-white hover:bg-amber-300 text-[#002b5e] hover:text-[#001d42] px-9 py-4 rounded-2xl font-extrabold text-base transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 no-underline flex items-center justify-center gap-2"
            >
              <span>Plan My Trip</span>
            </Link>

            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-9 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 no-underline flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Talk to an Expert</span>
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default TravelCTA;