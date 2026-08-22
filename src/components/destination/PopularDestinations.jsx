import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import DestinationCard from './DestinationCard';
import { destinations } from '../../data/destinations';
import { motion } from 'framer-motion';

const PopularDestinations = () => {
  const popular = destinations.slice(0, 4);
  return (
    <section className="py-16 md:py-20 bg-gray-50/50 border-y border-gray-100">
      <Container>
        <SectionHeader 
          eyebrow="Top Choices" 
          title="Popular Destinations" 
          description="Handpicked places our travellers love to explore." 
          actionText="View All Destinations" 
          actionLink="/domestic-destinations" 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {popular.map((dest, i) => (
            <motion.div 
              key={dest.slug || i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="h-full"
            >
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularDestinations;