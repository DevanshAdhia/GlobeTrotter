import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, IndianRupee, Heart, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DestinationGallery from './DestinationGallery';

const DestinationHero = ({ destination }) => {
  const handleWishlist = () => toast('Log in to save destination.', { icon: '🔒' });
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${destination.name} | Ajay Modi Travels`,
          text: destination.description || destination.shortDescription,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Destination link copied.');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const getSubheading = () => {
    if (!destination) return '';
    if (destination.category === 'domestic') return `${destination.state || ''}, India`;
    if (destination.category === 'international') return destination.country || 'International';
    if (destination.category === 'weekend') return `${destination.state || ''} • Short Drive`;
    return destination.state || destination.country || 'Global Destination';
  };

  if (!destination) return null;

  const galleryImages = (destination.gallery && destination.gallery.length > 0)
    ? destination.gallery
    : (destination.image && destination.image.length > 0)
      ? destination.image
      : [destination.heroImage || 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600'];

  const currencySym = destination.currency || '₹';

  return (
    <section className="mb-12">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Gallery */}
        <div className="w-full lg:w-[55%] xl:w-[60%]">
          <DestinationGallery images={galleryImages} title={destination?.name} />
        </div>
        
        {/* Right: Info Panel */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#002b5e]/10 text-[#002b5e] text-xs font-extrabold uppercase tracking-wider">
                {destination.category || 'Destination'}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={handleShare} aria-label="Share destination" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Share2 className="w-5 h-5" /></button>
                <button onClick={handleWishlist} aria-label="Save destination" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Heart className="w-5 h-5" /></button>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{destination.name}</h1>
            <p className="text-base text-gray-500 flex items-center mb-6 font-medium">
              <MapPin className="w-5 h-5 mr-1 text-primary" /> {getSubheading()}
            </p>
            
            <p className="text-gray-600 text-base mb-8 leading-relaxed">
              {destination.description || destination.overview}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8 border-y border-gray-100 py-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 mr-3" />
                <div>
                  <p className="font-bold text-gray-900">{destination.rating || 4.8}</p>
                  <p className="text-xs text-gray-500">{destination.reviewCount || 300} Reviews</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#002b5e] mr-3" />
                <div>
                  <p className="font-bold text-gray-900">{destination.duration || '7 - 10 Days'}</p>
                  <p className="text-xs text-gray-500">Ideal Duration</p>
                </div>
              </div>
              <div className="flex items-center col-span-2">
                <IndianRupee className="w-6 h-6 text-emerald-600 mr-2" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Starting from</p>
                  <p className="text-2xl font-extrabold text-gray-900">{currencySym}{(destination.startingPrice || 69999).toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500"> / person</span></p>
                </div>
              </div>
            </div>
            
            <button onClick={() => {
              const el = document.getElementById('packages');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="w-full bg-[#002b5e] hover:bg-blue-900 text-white text-base font-bold py-4 rounded-xl shadow-lg transition-colors focus:outline-none">
              View Tour Packages
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;