import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X, Grid2X2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationGallery = ({ images, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    if (lightboxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, images.length]);

  return (
    <>
      <div className="relative group rounded-2xl overflow-hidden bg-gray-100">
        <div className="overflow-hidden aspect-[4/3] sm:aspect-[16/10]" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src, i) => (
              <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
                <img src={src} alt={`${title} view ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        
        {images.length > 1 && (
          <>
            <button aria-label="Previous image" onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
            <button aria-label="Next image" onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary shadow-sm"><ChevronRight className="w-5 h-5" /></button>
          </>
        )}
        
        <button aria-label="View all photos" onClick={() => setLightboxOpen(true)} className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-sm hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Grid2X2 className="w-4 h-4 mr-2" /> View All Photos
        </button>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Image gallery fullscreen">
            <button aria-label="Close gallery" onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center">
              <button aria-label="Previous image" onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))} className="absolute left-4 z-10 p-3 text-white/50 hover:text-white focus:outline-none"><ChevronLeft className="w-10 h-10" /></button>
              <img src={images[currentIndex]} alt={`${title} view ${currentIndex + 1}`} className="max-h-[85vh] max-w-full object-contain select-none" />
              <button aria-label="Next image" onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))} className="absolute right-4 z-10 p-3 text-white/50 hover:text-white focus:outline-none"><ChevronRight className="w-10 h-10" /></button>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-widest text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default DestinationGallery;