import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ThumbsUp } from 'lucide-react';
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

  const ratingScore = pkg.rating || 9.2;
  const ratingText = ratingScore >= 9.0 ? 'Exceptional' : ratingScore >= 8.5 ? 'Excellent' : 'Very Good';
  const reviewCount = pkg.reviews || 418;
  const originalPrice = pkg.originalPrice || (pkg.price ? Math.round(Number(pkg.price) * 1.15) : null);

  return (
    <Link 
      to={`/packages/${pkg.slug}`} 
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 no-underline text-inherit"
    >
      {/* Media Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageSlider 
          images={pkg.image} 
          alt={pkg.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />

        {/* Top Right Wishlist Button */}
        <button 
          onClick={handleWishlist} 
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-rose-500 transition-all z-10 scale-100 hover:scale-105"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`} />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Header Tag + Stars + Genius Badge */}
          <div className="flex items-center space-x-1.5 mb-1.5 flex-wrap gap-y-1">
            <span className="text-xs font-semibold text-gray-600">
              {pkg.type || 'Package'}
            </span>

            <div className="flex items-center space-x-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>

            <span className="inline-flex items-center space-x-1 bg-[#003b95] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
              <ThumbsUp className="w-2.5 h-2.5 fill-current" />
              <span>Genius</span>
            </span>
          </div>

          {/* Package Title */}
          <h3 className="text-base font-extrabold text-gray-900 leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {pkg.name}
          </h3>

          {/* Subtitle / Location */}
          <p className="text-xs text-gray-500 font-normal mb-3 line-clamp-1">
            {pkg.location || pkg.subtitle || 'India & Beyond'}
          </p>

          {/* Rating Score & Reviews Row */}
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="bg-[#003580] text-white text-xs font-extrabold px-2 py-1 rounded-lg shrink-0 flex items-center justify-center">
              {ratingScore}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-gray-900 leading-none">{ratingText}</span>
              <span className="text-[11px] font-medium text-gray-500 mt-0.5">{reviewCount} reviews</span>
            </div>
          </div>
        </div>

        {/* Pricing Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-end justify-end mt-auto text-right">
          <div>
            <span className="text-[11px] font-normal text-gray-500 mr-1.5">Starting from</span>
            {originalPrice && originalPrice > pkg.price && (
              <span className="text-xs text-rose-500 line-through font-bold mr-1.5">
                ₹{Number(originalPrice).toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-base font-extrabold text-gray-900">
              ₹{pkg.price ? Number(pkg.price).toLocaleString('en-IN') : '12,999'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;