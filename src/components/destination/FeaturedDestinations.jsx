import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedDestinations = ({ destinations }) => {
  if (!destinations || destinations.length === 0) return null;
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending in India</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map(dest => (
          <Link key={dest.id} to={`/destinations/${dest.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[16/9] block shadow-sm">
            <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full text-white">
              <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
              <p className="text-white/80 text-sm mb-3 line-clamp-1">{dest.shortDescription}</p>
              <span className="inline-flex items-center text-sm font-medium border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FeaturedDestinations;