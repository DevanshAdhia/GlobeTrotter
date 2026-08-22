import React, { useState, useMemo } from 'react';
import DestinationPackageCard from './DestinationPackageCard';
import { PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationPackages = ({ packages, destinationName, destinationSlug }) => {
  const [filterStyle, setFilterStyle] = useState('All');
  const [sortOrder, setSortOrder] = useState('recommended');

  const filteredAndSortedPackages = useMemo(() => {
    let result = packages;
    
    // Filter
    if (filterStyle !== 'All') {
      result = result.filter(pkg => pkg.style === filterStyle);
    }
    
    // Sort
    return [...result].sort((a, b) => {
      if (sortOrder === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortOrder === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortOrder === 'highest-rated') return b.rating - a.rating;
      if (sortOrder === 'shortest') return a.nights - b.nights;
      if (sortOrder === 'longest') return b.nights - a.nights;
      return 0; // recommended (default order from data)
    });
  }, [packages, filterStyle, sortOrder]);

  if (!packages || packages.length === 0) {
    return (
      <section id="packages" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Packages</h2>
        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
          <PackageSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-medium mb-2">Packages are currently being updated.</p>
          <Link to={`/contact?destination=${destinationSlug}`} className="text-primary hover:underline font-medium">
            Talk to an Expert for Custom Packages
          </Link>
        </div>
      </section>
    );
  }

  const styles = ['All', ...new Set(packages.map(p => p.style).filter(Boolean))];

  return (
    <section id="packages" className="mb-16 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Packages</h2>
          <p className="text-gray-500">Choose a trip that fits your time and travel style for {destinationName}.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filters */}
          <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto hide-scrollbar max-w-xs sm:max-w-none">
            {styles.map(style => (
              <button key={style} onClick={() => setFilterStyle(style)} aria-pressed={filterStyle === style}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterStyle === style ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                {style}
              </button>
            ))}
          </div>
          
          {/* Sort */}
          <select aria-label="Sort packages" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="shortest">Duration: Shortest</option>
            <option value="longest">Duration: Longest</option>
            <option value="highest-rated">Highest Rated</option>
          </select>
        </div>
      </div>

      {filteredAndSortedPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPackages.map((pkg) => (
            <DestinationPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl">
          <p className="text-gray-500 mb-4">No packages match your selection.</p>
          <button onClick={() => setFilterStyle('All')} className="text-primary font-bold hover:underline">Clear Filters</button>
        </div>
      )}
    </section>
  );
};
export default DestinationPackages;