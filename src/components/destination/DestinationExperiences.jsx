import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const DestinationExperiences = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;

  const defaultImages = [
    'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800',
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800',
    'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=800',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800'
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Things to Experience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {experiences.map((exp, i) => {
          const title = exp.title || exp.name || 'Top Experience';
          const description = exp.description || exp.desc || `Must-try activity featuring authentic local highlights.`;
          const image = exp.image || defaultImages[i % defaultImages.length];
          const tag = exp.tag || 'Must Visit';

          return (
            <motion.div 
              key={exp.id || title || i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute top-3 left-3 bg-[#002b5e]/90 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {tag}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-600 mb-4 flex-1 leading-relaxed">{description}</p>
                {exp.duration && (
                  <div className="flex items-center text-xs font-medium text-gray-500 mt-auto">
                    <Clock className="w-3.5 h-3.5 mr-1 text-primary" /> {exp.duration}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DestinationExperiences;