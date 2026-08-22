import React from 'react';
import { MapPin, Star, Moon, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageHotels = ({ hotels }) => {
  if (!hotels || hotels.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Where You'll Stay</h2>
      <p className="text-sm text-gray-500 mb-6 italic">Hotel availability may vary based on travel dates and package selection.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div key={index} whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="aspect-[16/9] overflow-hidden relative">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900 flex items-center shadow-sm">
                <Star className="w-3.5 h-3.5 mr-1 text-accent fill-accent" /> {hotel.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{hotel.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center text-sm text-gray-500"><MapPin className="w-4 h-4 mr-1 text-gray-400" /> {hotel.location}</span>
                <span className="flex items-center text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded"><Moon className="w-3.5 h-3.5 mr-1" /> {hotel.nights} Nights</span>
              </div>
              <div className="mt-auto border-t border-gray-50 pt-3 flex flex-wrap gap-x-4 gap-y-2">
                {hotel.amenities.map((amenity, i) => (
                  <span key={i} className="flex items-center text-xs text-gray-600"><Check className="w-3 h-3 mr-1 text-green-500" /> {amenity}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default PackageHotels;