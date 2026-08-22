import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const TravelExperienceCard = ({ style }) => {
  const Icon = style.icon;
  const [imgSrc, setImgSrc] = useState(style.image);
  
  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group block rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-gray-100 relative h-[440px]"
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image with Smooth Hover Zoom */}
        <img 
          src={imgSrc} 
          alt={style.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
          loading="lazy" 
          onError={() => setImgSrc('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800')} 
        />
        
        {/* Multi-stage Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-colors duration-300" />

        {/* Top Right Floating Badge */}
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Featured
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-7 pb-8 w-full z-10 flex flex-col justify-end">
          {/* Glass Icon Box */}
          <div className="w-13 h-13 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-4 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-lg p-3">
            <Icon className="w-6 h-6" />
          </div>

          <h3 className="text-white text-2xl font-extrabold mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
            {style.title}
          </h3>
          
          <p className="text-gray-200/90 text-sm mb-5 leading-relaxed line-clamp-2">
            {style.description}
          </p>

          <Link 
            to="/packages" 
            className="inline-flex items-center text-white font-bold text-sm hover:text-amber-300 transition-colors group/link no-underline mt-auto"
          >
            <span className="border-b border-white/40 group-hover/link:border-amber-300 pb-0.5 transition-colors">
              Explore Packages
            </span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TravelExperienceCard;