import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const DestinationExperiences = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Things to Experience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {experiences.map((exp, i) => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{exp.description}</p>
              {exp.duration && (
                <div className="flex items-center text-xs font-medium text-gray-500 mt-auto">
                  <Clock className="w-3.5 h-3.5 mr-1 text-primary" /> {exp.duration}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default DestinationExperiences;