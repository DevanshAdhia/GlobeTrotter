import React from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import PackageCard from './PackageCard';
import { packages } from '../../data/packages';
import { motion } from 'framer-motion';

const PopularPackages = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeader eyebrow="Best Sellers" title="Popular Tour Packages" description="Handpicked journeys for every kind of traveller." actionText="View All Packages" actionLink="/packages" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default PopularPackages;