import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAROUSEL_IMAGES = [
  '/images/kashmir.jpg',
  '/images/kerala.jpg',
  '/images/rajasthan.jpg',
  '/images/himachal.jpg',
  '/images/goa.jpg',
  '/images/dubai.jpg'
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={CAROUSEL_IMAGES[currentImageIndex]}
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
      <div className="relative z-20 text-white px-8 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-16">
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