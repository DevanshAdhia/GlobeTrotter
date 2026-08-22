import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Star, Clock, Car } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageSlider from '../common/ImageSlider';

const WeekendGatewayCard = ({ destination, selectedCity }) => {
  const handleWishlist = (e) => {
    e.preventDefault();
    toast(`Log in to save ${destination.name}.`, { icon: '🔒' });
  };
  
  const distance = selectedCity && destination.distance?.[selectedCity];
  const travelTime = selectedCity && destination.travelTime?.[selectedCity];
  
  return (
    <motion.div whileHover={{ y: -4 }} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <ImageSlider images={destination.image} alt={destination.name} className="transition-transform duration-500 xl:group-hover:scale-105" />
        <button onClick={handleWishlist} aria-label={`Save ${destination.name}`} className="absolute top-4 right-4 p-2 rounded-full bg-white/50 backdrop-blur hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-sm z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{destination.name}</h3>
            <p className="text-sm text-gray-500">{destination.state}</p>
          </div>
          <div className="flex items-center text-accent bg-accent/10 px-2 py-1 rounded text-sm font-semibold shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" />
            {destination.rating}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-4 mt-2">
          {travelTime && (
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
              <Car className="w-4 h-4 mr-2 text-primary" />
              <span>{travelTime} from {selectedCity}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{destination.duration}</span>
            {distance && <><span className="mx-2 text-gray-300">•</span><span>{distance}</span></>}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Starting from</p>
            <p className="text-lg font-bold text-gray-900 leading-none">₹{(destination.startingPrice || 15000).toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/person</span></p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/destinations/${destination.slug}`} className="bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-3 py-1.5 transition-colors group/link">
              Explore <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform xl:group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default WeekendGatewayCard;