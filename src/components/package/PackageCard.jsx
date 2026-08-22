import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageSlider from '../common/ImageSlider';

const PackageCard = ({ pkg }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast(isLiked ? 'Removed from saved packages.' : 'Added package to wishlist!', { 
      icon: isLiked ? '🗑️' : '❤️' 
    });
  };

  return (
    <Link 
      to={`/packages/${pkg.slug}`} 
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,51,128,0.12)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 no-underline text-inherit"
    >
      {/* Media Aspect Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageSlider 
          images={pkg.image} 
          alt={pkg.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" 
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges Row */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {pkg.badge ? (
            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold text-white shadow-xs uppercase tracking-wider backdrop-blur-md border border-white/20 flex items-center space-x-1
              ${pkg.badge.includes('Best') ? 'bg-emerald-600/90' : 
                pkg.badge.includes('Popular') ? 'bg-primary/90' : 
                pkg.badge.includes('Trending') ? 'bg-amber-600/90' : 
                pkg.badge.includes('Luxury') ? 'bg-purple-600/90' : 'bg-blue-600/90'}`}>
              <Sparkles className="w-3 h-3 text-accent" />
              <span>{pkg.badge}</span>
            </span>
          ) : <div />}

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

        {/* Bottom Duration Badge over image */}
        {pkg.duration && (
          <div className="absolute bottom-3.5 left-3.5 text-white z-10">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[11px] font-extrabold tracking-wide border border-white/10">
              <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-500 font-extrabold mb-1.5">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{pkg.rating || 4.8}</span>
              <span className="text-gray-400 font-normal">({pkg.reviews || 240} reviews)</span>
            </div>
          </div>

          <h3 className="text-lg font-extrabold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {pkg.name}
          </h3>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Starting From</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-extrabold text-emerald-600">
                ₹{pkg.price ? Number(pkg.price).toLocaleString('en-IN') : '12,999'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">/ person</span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 shadow-xs">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;