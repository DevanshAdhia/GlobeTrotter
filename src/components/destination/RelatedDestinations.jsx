import React, { useState, useEffect } from 'react';
import { destinations } from '../../data/destinations';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Reusing a simplified card just for the related section to avoid circular dependencies if we move things around
const SimpleDestCard = ({ destination }) => (
  <motion.div whileHover={{ y: -4 }} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={destination.heroImage} alt={destination.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900 flex items-center">
        <Star className="w-3 h-3 mr-1 text-accent fill-accent" /> {destination.rating}
      </div>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="font-bold text-gray-900 mb-1">{destination.name}</h3>
      <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{destination.shortDescription}</p>
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-bold text-gray-900">From {destination.currency}{destination.startingPrice.toLocaleString('en-IN')}</span>
        <Link to={`/destinations/${destination.slug}`} className="text-primary hover:text-primary-dark p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  </motion.div>
);

const RelatedDestinations = ({ relatedSlugs, currentCategory }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!relatedSlugs || relatedSlugs.length === 0) return;
    // Find related destinations from full list
    const found = destinations.filter(d => relatedSlugs.includes(d.slug));
    setRelated(found);
  }, [relatedSlugs]);

  if (related.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {related.map(dest => (
          <SimpleDestCard key={dest.id} destination={dest} />
        ))}
      </div>
    </section>
  );
};
export default RelatedDestinations;