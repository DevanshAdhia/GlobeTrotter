import React from 'react';
import Container from './Container';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TravelCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80" alt="Airplane wing" className="w-full h-full object-cover opacity-20" />
      </div>
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-white/90 mb-10">
            Tell us where you want to go and we'll help you plan the journey.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/plan" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
              Plan My Trip
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              Talk to an Expert
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
export default TravelCTA;