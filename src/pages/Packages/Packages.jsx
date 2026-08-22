import React, { useState } from 'react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import PackageCard from '../../components/package/PackageCard';
import { featuredPackages } from '../../data/packages';
import { Search, Filter, Sparkles } from 'lucide-react';

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Domestic', 'International', 'Weekend', 'Family', 'Honeymoon'];

  const filteredPackages = featuredPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Domestic' && pkg.type === 'domestic') ||
      (selectedCategory === 'International' && pkg.type === 'international') ||
      (selectedCategory === 'Weekend' && pkg.type === 'weekend') ||
      (selectedCategory === 'Family' && (pkg.tags || []).includes('Family')) ||
      (selectedCategory === 'Honeymoon' && (pkg.tags || []).includes('Honeymoon'));

    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pkg.destinationSlug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Topbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#001d42] via-[#002b5e] to-indigo-950 text-white py-16 relative">
        <Container className="text-center max-w-4xl mx-auto">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-3 inline-block">
            Curated Holiday Packages
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Explore All Tour Packages
          </h1>
          <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
            Discover handpicked domestic and international holiday packages with transparent pricing and 5-star hotel options.
          </p>
        </Container>
      </section>

      {/* Filter & Search Bar Strip */}
      <section className="-mt-8 relative z-20 max-w-5xl mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#002b5e] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary"
            />
          </div>

        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory} Packages ({filteredPackages.length})
            </h2>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700 mb-1">No Packages Found</h3>
              <p className="text-xs text-gray-400 mb-4">Try clearing your search query or selecting a different category filter.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-[#002b5e] text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
