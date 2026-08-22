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
          text: destination.shortDescription,
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
    if (destination.category === 'international') return destination.country || '';
    if (destination.category === 'weekend') return `${destination.state || ''} • ${destination.distance?.Ahmedabad || 'Short Drive'}`;
    return destination.state || destination.country || '';
  };

  if (!destination) return null;

  return (
    <section className="mb-12">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Gallery */}
        <div className="w-full lg:w-[55%] xl:w-[60%]">
          <DestinationGallery images={destination?.gallery || []} title={destination?.name} />
        </div>
        
        {/* Right: Info Panel */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {destination.category || 'Destination'}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={handleShare} aria-label="Share destination" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Share2 className="w-5 h-5" /></button>
                <button onClick={handleWishlist} aria-label="Save destination" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Heart className="w-5 h-5" /></button>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{destination.name}</h1>
            <p className="text-lg text-gray-500 flex items-center mb-6">
              <MapPin className="w-5 h-5 mr-1 text-primary" /> {getSubheading()}
            </p>
            
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {destination.shortDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8 border-y border-gray-100 py-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-accent fill-accent mr-3" />
                <div>
                  <p className="font-bold text-gray-900">{destination.rating}</p>
                  <p className="text-sm text-gray-500">{destination.reviewCount} Reviews</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="font-bold text-gray-900">{destination.duration}</p>
                  <p className="text-sm text-gray-500">Ideal Duration</p>
                </div>
              </div>
              <div className="flex items-center col-span-2">
                <IndianRupee className="w-6 h-6 text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">{destination.currency}{(destination.startingPrice || 0).toLocaleString('en-IN')}<span className="text-base font-normal text-gray-500"> / person</span></p>
                </div>
              </div>
            </div>
            
            <button onClick={() => {
              const el = document.getElementById('packages');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50">
              View Tour Packages
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default DestinationHero;