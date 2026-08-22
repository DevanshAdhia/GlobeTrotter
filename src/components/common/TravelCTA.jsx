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
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/about" 
              className="cta-btn-primary w-full sm:w-auto"
            >
              <span>Plan My Trip</span>
              <Compass className="w-4 h-4 shrink-0" />
            </Link>

            <Link 
              to="/contact" 
              className="cta-btn-secondary w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4 shrink-0 text-amber-300" />
              <span>Talk to an Expert</span>
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default TravelCTA;