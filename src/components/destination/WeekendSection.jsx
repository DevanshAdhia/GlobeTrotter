import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { destinations } from '../../data/destinations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WeekendSection = () => {
  const weekend = destinations.filter(d => d.type === 'weekend').slice(0, 4);
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <SectionHeader eyebrow="Quick Escapes" title="Perfect Weekend Escapes" description="Short trips. Big memories." actionText="View All Weekend Gateways" actionLink="/weekend-gateways" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weekend.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">{dest.duration}</span>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{dest.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{dest.region}</p>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">From</p>
                    <p className="font-bold text-gray-900">₹{dest.price.toLocaleString('en-IN')}</p>
                  </div>
                  <Link to={`/destinations/${dest.name.toLowerCase()}`} className="text-primary font-medium text-sm flex items-center group/link">
                    Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default WeekendSection;