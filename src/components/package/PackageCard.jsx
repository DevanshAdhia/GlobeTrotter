import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageSlider from '../common/ImageSlider';

const PackageCard = ({ pkg }) => {
  const handleWishlist = (e) => {
    e.preventDefault();
    toast('Please log in to save this trip.', { icon: '🔒' });
  };
  return (
    <Link to={`/packages/${pkg.id}`} className="group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageSlider images={pkg.image} alt={pkg.name} className="transition-transform duration-500 group-hover:scale-105" />
        
        {/* Dynamic Badge */}
        {pkg.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm z-10 
            ${pkg.badge.includes('Best') ? 'bg-[#10b981]' : 
              pkg.badge.includes('Popular') ? 'bg-[#3b82f6]' : 
              pkg.badge.includes('Trending') ? 'bg-[#f59e0b]' : 
              pkg.badge.includes('Luxury') ? 'bg-[#8b5cf6]' : 'bg-[#0ea5e9]'}`}>
            {pkg.badge}
          </span>
        )}
        <button onClick={handleWishlist} className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-sm">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-1">{pkg.name}</h3>
        <p className="text-[13px] text-gray-500 mb-3">{pkg.duration}</p>
        
        <div className="flex flex-col mt-auto pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-[#10b981]">₹{pkg.price ? Number(pkg.price).toLocaleString('en-IN') : '12,999'}</span>
            <span className="text-[11px] text-gray-500 font-medium">/ person</span>
          </div>
          
          <div className="flex items-center text-[#f59e0b] text-[12px] font-bold mt-1.5">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
            {pkg.rating} <span className="text-gray-400 font-medium ml-1">({pkg.reviews || 320})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PackageCard;