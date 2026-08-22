import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import DestinationCard from './DestinationCard';
import { destinations } from '../../data/destinations';
import { motion } from 'framer-motion';

const DomesticSection = () => {
  const domestic = destinations.filter(d => d.type === 'domestic').slice(0, 4);
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <SectionHeader eyebrow="Incredible India" title="Explore India" description="Discover unforgettable journeys across India." actionText="View All Domestic Destinations" actionLink="/destinations?type=domestic" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domestic.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default DomesticSection;