import React from 'react';
import Container from './Container';
import SectionHeader from './SectionHeader';
import TravelExperienceCard from './TravelExperienceCard';
import { travelStyles } from '../../data/travelStyles';
import { motion } from 'framer-motion';

const TravelExperiences = () => {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <SectionHeader eyebrow="Curated For You" title="Travel Your Way" description="Find the perfect holiday style that matches your vibe." actionText="View All Styles" actionLink="/styles" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelStyles.map((style, i) => (
            <motion.div key={style.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <TravelExperienceCard style={style} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default TravelExperiences;