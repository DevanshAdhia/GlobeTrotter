import React, { useState } from 'react';
import Container from './Container';
import SectionHeader from './SectionHeader';
import { testimonials } from '../../data/testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Get items to display (responsive: show 3 items on desktop starting from currentIndex)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[idx]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <SectionHeader eyebrow="Testimonials" title="What Our Travellers Say" description="Real reviews from real adventurers across India and the globe." />
          <div className="flex gap-2 mb-2">
            <button 
              aria-label="Previous testimonials" 
              onClick={prevSlide} 
              className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary shadow-sm transition-all duration-200 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              aria-label="Next testimonials" 
              onClick={nextSlide} 
              className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary shadow-sm transition-all duration-200 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getVisibleTestimonials().map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex text-amber-400 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 text-base leading-relaxed">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-base mb-0.5">{t.name}</h4>
                      <span className="text-xs text-primary font-semibold">{t.trip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;