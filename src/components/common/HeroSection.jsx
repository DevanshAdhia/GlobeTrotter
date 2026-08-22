import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const CAROUSEL_IMAGES = [
  '/images/kashmir.jpg',
  '/images/kerala.jpg',
  '/images/rajasthan.jpg',
  '/images/himachal.jpg',
  '/images/goa.jpg',
  '/images/dubai.jpg'
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    
    // Auto-play interval
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden group">
      {/* Slider */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {CAROUSEL_IMAGES.map((src, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <motion.img 
                initial={{ scale: 1 }} 
                animate={{ scale: currentIndex === i ? 1.05 : 1 }} 
                transition={{ duration: 15, ease: "linear" }} 
                src={src} 
                alt={`Travel destination ${i + 1}`} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      
      <div className="absolute inset-0 z-10 w-full max-w-7xl mx-auto px-8 text-white flex flex-col justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm md:text-base font-semibold mb-4 text-[#89c4ff]">
            Your Journey Begins Here
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl leading-tight">
            Explore the World <br/> with Ajay Modi Travels
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl text-left">
            Handpicked domestic and international tour packages curated for unforgettable memories.
          </motion.p>
          
          {/* Badges row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} 
            className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 hidden md:flex">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" /> Best Price Guarantee
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" /> No Hidden Charges
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" /> 24x7 Support
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" /> Expert Travel Planners
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thumbnails Overlay */}
      <div className="absolute bottom-[20%] lg:bottom-16 right-4 sm:right-8 z-20 flex justify-center gap-3 px-4 pointer-events-auto hidden sm:flex">
        {CAROUSEL_IMAGES.map((src, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
              currentIndex === i 
                ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-30' 
                : 'border-white/30 opacity-60 hover:opacity-100 scale-100'
            }`}
          >
            <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            {currentIndex === i && (
              <motion.div 
                layoutId="home-active-thumb" 
                className="absolute inset-0 border-2 border-primary rounded-lg z-10 pointer-events-none" 
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;