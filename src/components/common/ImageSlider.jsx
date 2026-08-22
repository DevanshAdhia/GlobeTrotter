import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images, alt, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // If only one image or a string is passed, wrap it and we just won't show arrows
  const imgArray = Array.isArray(images) && images.length > 0 
    ? images 
    : typeof images === 'string' 
      ? [images, 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800'] 
      : [];

  const slideNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === imgArray.length ? 0 : prev + 1));
  };

  const slidePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? imgArray.length - 1 : prev - 1));
  };

  const goToSlide = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (imgArray.length === 0) return null;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (dir) => ({ x: dir < 0 ? 100 : -100, opacity: 0, zIndex: 0 })
  };

  const [imgSrc, setImgSrc] = useState(imgArray[currentIndex]);

  // Keep imgSrc in sync if currentIndex or imgArray changes
  React.useEffect(() => {
    setImgSrc(imgArray[currentIndex]);
  }, [currentIndex, imgArray]);

  const handleError = () => {
    // Premium generic travel fallback image
    setImgSrc('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800');
  };

  return (
    <div className={`relative w-full h-full overflow-hidden group/slider ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          src={imgSrc}
          onError={handleError}
          alt={`${alt} - view ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation Arrows (visible on hover) */}
      {imgArray.length > 1 && (
        <>
          <button 
            onClick={slidePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur text-gray-800 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white hover:scale-105 z-10 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={slideNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur text-gray-800 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white hover:scale-105 z-10 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {imgArray.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => goToSlide(e, idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
