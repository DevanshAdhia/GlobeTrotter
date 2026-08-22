import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageSlider from '../common/ImageSlider';

const DestinationCard = ({ destination }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast(isLiked ? 'Removed from saved trips.' : 'Saved destination to wishlist!', { 
      icon: isLiked ? '🗑️' : '❤️' 
    });
  };

  return (
    <Link 
      to={`/destinations/${destination.slug || ''}`} 
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,51,128,0.12)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 no-underline text-inherit"
    >
      {/* Media Aspect Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageSlider 
          images={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
        />
        
        {/* Overlay Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges Row */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold text-white bg-primary/90 backdrop-blur-md shadow-xs uppercase tracking-wider border border-white/20 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>{destination.category || 'Popular'}</span>
          </span>

          <button 
            onClick={handleWishlist} 
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isLiked 
                ? 'bg-rose-500 text-white scale-110' 
                : 'bg-white/70 hover:bg-white text-gray-700 hover:text-rose-500 hover:scale-105'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Destination Tag line over image */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
          <div className="flex items-center space-x-1 text-[11px] font-bold opacity-90 tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{destination.country || destination.subtitle || 'Top Destination'}</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-1 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed mb-4">
            {destination.description || `Explore handpicked holiday packages for ${destination.name}.`}
          </p>
        </div>

        {/* Footer info: Package Count & Starting Price */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Packages</span>
            <span className="text-sm font-extrabold text-gray-800">{destination.packageCount || 12}+ Available</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Starting From</span>
            <span className="text-lg font-extrabold text-emerald-600">
              ₹{(destination.startingPrice || 12999).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;