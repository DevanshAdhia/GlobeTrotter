import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

const heroImages = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=2000&q=80", // Paris
  "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=2000&q=80", // Alps/Switzerland
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=2000&q=80", // Maldives
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=2000&q=80"  // Japan
];

const InternationalHero = () => {
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
    <section className="relative w-full h-[50vh] min-h-[500px] overflow-hidden group">
      {/* Slider */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroImages.map((src, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <motion.img 
                initial={{ scale: 1 }} 
                animate={{ scale: currentIndex === i ? 1.05 : 1 }} 
                transition={{ duration: 15, ease: "linear" }} 
                src={src} 
                alt={`International Travel ${i + 1}`} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      
      <div className="absolute inset-0 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex items-center pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-primary-light font-bold tracking-widest text-sm uppercase mb-3">
            INTERNATIONAL JOURNEYS
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover the World
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            From relaxing island escapes to exciting city adventures, find a journey that matches the way you love to travel.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/packages" className="cta-btn-primary">
              Explore International Packages
            </Link>
            <Link to="/plan" className="cta-btn-secondary">
              Plan My Trip
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Thumbnails Overlay */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex justify-center gap-3 px-4 pointer-events-auto">
        {heroImages.map((src, i) => (
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
                layoutId="hero-active-thumb" 
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
export default InternationalHero;