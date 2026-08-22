import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center">
      <img src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2560" alt="Beautiful mountain landscape" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <div className="relative z-10 text-white px-8 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-16">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm md:text-base font-semibold mb-4 text-[#89c4ff]">Your Journey Begins Here</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl leading-tight">Explore the World <br/> with Ajay Modi Travels</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl text-left">
          Handpicked domestic and international tour packages curated for unforgettable memories.
        </motion.p>
        
        {/* Badges row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} 
          className="flex flex-wrap items-center gap-6 mt-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-white" /> Best Price Guarantee
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-white" /> No Hidden Charges
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-white" /> 24x7 Support
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-white" /> Expert Travel Planners
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;