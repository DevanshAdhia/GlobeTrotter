import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X, Grid2X2, Maximize2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PackageGallery = ({ images: imagesProp, title }) => {
  const images = imagesProp && imagesProp.length > 0 ? imagesProp : [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544181829-170ccf026a79?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580211110091-a67b4b123616?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=800&auto=format&fit=crop"
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index = 0) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

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
    <section className="mb-10">
      {/* Desktop/Tablet Collage Grid View */}
      <div className="hidden md:grid grid-cols-4 gap-3 h-[420px] rounded-3xl overflow-hidden relative shadow-lg group">
        {/* Main Large Image (Spans 2 columns) */}
        <div 
          onClick={() => openLightbox(0)}
          className="col-span-2 relative h-full overflow-hidden cursor-pointer group/item"
        >
          <img 
            src={images[0]} 
            alt={`${title} main`} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-xs font-semibold flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <Maximize2 className="w-3.5 h-3.5 mr-1.5" /> Click to enlarge
            </span>
          </div>
        </div>

        {/* Secondary Images (Grid of 4) */}
        <div className="col-span-2 grid grid-cols-2 gap-3 h-full">
          {images.slice(1, 5).map((src, idx) => {
            const actualIndex = idx + 1;
            const isLast = idx === 3 && images.length > 5;
            const remainingCount = images.length - 5;

            return (
              <div 
                key={idx}
                onClick={() => openLightbox(actualIndex)}
                className="relative h-[204px] overflow-hidden cursor-pointer group/item rounded-xl"
              >
                <img 
                  src={src} 
                  alt={`${title} preview ${actualIndex + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
                />
                
                {isLast ? (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all group-hover/item:bg-black/70">
                    <Grid2X2 className="w-6 h-6 mb-1 text-accent animate-pulse" />
                    <span className="text-lg font-extrabold tracking-wide">+{remainingCount + 1} More</span>
                    <span className="text-[11px] font-medium text-gray-300">View Full Gallery</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating View All Button */}
        <button 
          onClick={() => openLightbox(0)} 
          className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md text-gray-900 hover:bg-white hover:text-primary px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center shadow-xl border border-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary z-10"
        >
          <Grid2X2 className="w-4 h-4 mr-2 text-primary" /> View All Photos ({images.length})
        </button>
      </div>

      {/* Mobile Embla Carousel View */}
      <div className="md:hidden relative group rounded-2xl overflow-hidden bg-gray-100 shadow-md">
        <div className="overflow-hidden aspect-[4/3]" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src, i) => (
              <div 
                className="flex-[0_0_100%] min-w-0 relative h-full cursor-pointer" 
                key={i}
                onClick={() => openLightbox(i)}
              >
                <img src={src} alt={`${title} photo ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                  {i + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button aria-label="Previous image" onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur text-gray-800 flex items-center justify-center hover:bg-white focus:outline-none shadow-md"><ChevronLeft className="w-5 h-5" /></button>
            <button aria-label="Next image" onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur text-gray-800 flex items-center justify-center hover:bg-white focus:outline-none shadow-md"><ChevronRight className="w-5 h-5" /></button>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 md:p-8" 
            role="dialog" 
            aria-modal="true" 
            aria-label="Image gallery fullscreen"
          >
            {/* Header / Close Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-bold text-sm md:text-base text-gray-200">{title}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold bg-white/10 backdrop-blur px-3 py-1 rounded-full text-gray-300">
                  {currentIndex + 1} of {images.length}
                </span>
                <button 
                  aria-label="Close gallery" 
                  onClick={() => setLightboxOpen(false)} 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Active Image Display */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button 
                aria-label="Previous image" 
                onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))} 
                className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur transition-all border border-white/10 focus:outline-none"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={images[currentIndex]} 
                  alt={`${title} view ${currentIndex + 1}`} 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[70vh] md:max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl select-none" 
                />
              </AnimatePresence>

              <button 
                aria-label="Next image" 
                onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))} 
                className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur transition-all border border-white/10 focus:outline-none"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 max-w-4xl mx-auto scrollbar-none">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                    currentIndex === i 
                      ? 'ring-2 ring-primary scale-110 opacity-100' 
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default PackageGallery;