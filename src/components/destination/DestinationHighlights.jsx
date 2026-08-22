import React from 'react';
import { Home, Ship, Snowflake, Utensils, Building, Sun, ShoppingBag, Mountain, Map, Compass, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { Home, Ship, Snowflake, Utensils, Building, Sun, ShoppingBag, Mountain, Map, Compass };

const DestinationHighlights = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Visit?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, i) => {
          const Icon = iconMap[item.icon] || CheckCircle;
          return (
            <motion.div 
              key={item.id || item.title || i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc || item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DestinationHighlights;