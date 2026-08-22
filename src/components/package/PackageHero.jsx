import React from 'react';
import { Star, Share2, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const PackageHero = ({ pkg }) => {
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    // Front-end state mock
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved packages.' : 'Package saved successfully.');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${pkg.name} | Ajay Modi Travels`,
          text: pkg.overview,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Package link copied.');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {pkg.name}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center text-gray-600 gap-4 text-sm font-medium">
            <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold uppercase">{pkg.duration}</span>
            <span className="flex items-center text-accent bg-accent/10 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 mr-1 fill-current" /> {pkg.rating} ({pkg.reviewCount} Reviews)
            </span>
            <span>{pkg.destinationSlug}</span>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-3 self-start">
          <button onClick={handleShare} aria-label="Share package" className="flex items-center px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </button>
          <button onClick={handleSave} aria-label={`Save ${pkg.name}`} className={`flex items-center px-4 py-2 rounded-xl border font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${saved ? 'border-red-100 bg-red-50 text-red-600' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
            <Heart className={`w-4 h-4 mr-2 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </section>
  );
};
export default PackageHero;