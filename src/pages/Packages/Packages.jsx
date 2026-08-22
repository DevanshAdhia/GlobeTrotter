import React, { useState, useEffect, useCallback } from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import PackageCard from '../../components/package/PackageCard';
import { featuredPackages } from '../../data/packages';
import { Search, Filter, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const heroImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2000&q=80", // Travel landscape
  "https://images.unsplash.com/photo-1504280390267-33106d19eeb3?w=2000&q=80", // Group travel
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=2000&q=80", // Explorer
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=2000&q=80"  // Cultural
];

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Embla Slider setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    const autoplay = setInterval(() => { emblaApi.scrollNext(); }, 5000);
    return () => { emblaApi.off('select', onSelect); clearInterval(autoplay); };
  }, [emblaApi, onSelect]);

  const categories = ['All', 'Domestic', 'International', 'Weekend', 'Family', 'Honeymoon'];

  const filteredPackages = featuredPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Domestic' && pkg.type === 'domestic') ||
      (selectedCategory === 'International' && pkg.type === 'international') ||
      (selectedCategory === 'Weekend' && pkg.type === 'weekend') ||
      (selectedCategory === 'Family' && (pkg.tags || []).includes('Family')) ||
      (selectedCategory === 'Honeymoon' && (pkg.tags || []).includes('Honeymoon'));

    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pkg.destinationSlug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      {/* Hero Header with Slider */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden group">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((src, i) => (
              <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
                <motion.img 
                  initial={{ scale: 1 }} 
                  animate={{ scale: currentIndex === i ? 1.05 : 1 }} 
                  transition={{ duration: 15, ease: "linear" }} 
                  src={src} 
                  alt={`Travel Package ${i + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
        
        <div className="absolute inset-0 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex items-center mt-[-30px] pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-amber-300 font-bold tracking-widest text-xs uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-3">
              Curated Holiday Packages
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Explore All Tour Packages
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
              Discover handpicked domestic and international holiday packages with transparent pricing and 5-star hotel options.
            </motion.p>
          </div>
        </div>

        {/* Thumbnails Overlay */}
        <div className="absolute bottom-8 right-4 sm:right-8 z-20 flex justify-center gap-3 px-4 pointer-events-auto hidden md:flex">
          {heroImages.map((src, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                currentIndex === i 
                  ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-30' 
                  : 'border-white/30 opacity-60 hover:opacity-100 scale-100'
              }`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              {currentIndex === i && (
                <motion.div 
                  layoutId="packages-active-thumb" 
                  className="absolute inset-0 border-2 border-primary rounded-lg z-10 pointer-events-none" 
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Filter & Search Bar Strip */}
      <section className="-mt-8 relative z-20 max-w-5xl mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#002b5e] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary"
            />
          </div>

        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory} Packages ({filteredPackages.length})
            </h2>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700 mb-1">No Packages Found</h3>
              <p className="text-xs text-gray-400 mb-4">Try clearing your search query or selecting a different category filter.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-[#002b5e] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
