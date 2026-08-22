import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Clock, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageSlider from '../common/ImageSlider';

const DestinationCard = ({ destination }) => {
  const handleWishlist = (e) => {
    e.preventDefault();
    toast('Log in to save destinations.', { icon: '🔒' });
  };
  return (
    <Link to={`/discover/${destination.slug || ''}`} className="group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageSlider images={destination.image} alt={destination.name} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 flex flex-col justify-between h-full bg-white">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4">{destination.name}</h3>
        <div className="flex justify-between items-end mt-auto pt-1">
          <p className="text-sm font-medium text-gray-500">{destination.packageCount || 12} Packages</p>
          <div className="text-right">
            <span className="text-[11px] text-gray-500 mr-1">From</span>
            <span className="text-[17px] font-bold text-[#10b981]">₹{(destination.startingPrice || 12999).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default DestinationCard;