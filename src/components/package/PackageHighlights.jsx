import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageHighlights = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary shadow-xs">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Trip Highlights</h2>
          <p className="text-xs text-gray-500 font-medium">Key experiences included in this package</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="flex items-start bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-1.5 mr-3.5 shrink-0 text-white shadow-xs group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-gray-800 font-bold text-sm leading-relaxed">{highlight}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default PackageHighlights;