import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TravelExperienceCard = ({ style }) => {
  const Icon = style.icon;
  return (
    <motion.div whileHover={{ y: -4 }} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={style.image} alt={style.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-white text-2xl font-bold mb-2">{style.title}</h3>
          <p className="text-white/80 text-sm mb-4 line-clamp-2">{style.description}</p>
          <Link to={`/experiences/${style.id}`} className="text-white font-medium text-sm flex items-center group/link">
            Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default TravelExperienceCard;