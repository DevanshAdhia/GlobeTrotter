import React, { useState, useEffect } from 'react';
import { packages } from '../../data/packages';
import DestinationPackageCard from '../destination/DestinationPackageCard';

const RelatedPackages = ({ currentSlug, destinationSlug }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Find other packages in the same destination, excluding current
    const found = packages.filter(p => p.destinationSlug === destinationSlug && p.slug !== currentSlug).slice(0, 3);
    setRelated(found);
  }, [currentSlug, destinationSlug]);

  if (related.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map(pkg => (
          <DestinationPackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
};
export default RelatedPackages;