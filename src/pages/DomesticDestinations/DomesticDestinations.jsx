import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationSearch from '../../components/destination/DestinationSearch';
import DestinationSort from '../../components/destination/DestinationSort';
import DestinationFilters from '../../components/destination/DestinationFilters';
import DestinationCard from '../../components/destination/DestinationCard';
import DestinationCardSkeleton from '../../components/destination/DestinationCardSkeleton';
import FeaturedDestinations from '../../components/destination/FeaturedDestinations';
import TravelCTA from '../../components/common/TravelCTA';
import { domesticDestinations } from '../../data/domesticDestinations';

const DomesticDestinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  
  // Parse filters from URL
  const initialFilters = {};
  for (let [key, value] of searchParams.entries()) {
    if (['region', 'travelType', 'duration', 'budget', 'bestFor', 'season'].includes(key)) {
      initialFilters[key] = value.split(',');
    }
  }
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters, sort]);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (sort !== 'recommended') params.set('sort', sort);
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        params.set(key, values.join(','));
      }
    });
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeFilters, sort, setSearchParams]);

  const handleFilterChange = (key, values) => {
    setActiveFilters(prev => ({ ...prev, [key]: values }));
    setVisibleCount(8);
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setSearchQuery('');
    setSort('recommended');
    setVisibleCount(8);
  };

  const removeFilter = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: prev[key].filter(v => v !== value)
    }));
  };

  const filteredDestinations = useMemo(() => {
    return domesticDestinations.filter(dest => {
      if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilters.region?.length > 0 && !activeFilters.region.includes(dest.region)) return false;
      if (activeFilters.travelType?.length > 0 && !activeFilters.travelType.some(t => dest.travelTypes.includes(t))) return false;
      if (activeFilters.bestFor?.length > 0 && !activeFilters.bestFor.some(t => dest.bestFor.includes(t))) return false;
      if (activeFilters.season?.length > 0 && !activeFilters.season.some(t => dest.season.includes(t))) return false;
      // Duration & Budget simplified matching for mock
      if (activeFilters.duration?.length > 0 && !activeFilters.duration.includes(dest.duration)) return false;
      if (activeFilters.budget?.length > 0) {
        const p = dest.startingPrice;
        if (activeFilters.budget.includes('Under ₹25,000') && p < 25000) return true;
        if (activeFilters.budget.includes('₹25,000 – ₹50,000') && p >= 25000 && p <= 50000) return true;
        if (activeFilters.budget.includes('₹50,000 – ₹1,00,000') && p > 50000 && p <= 100000) return true;
        if (activeFilters.budget.includes('Above ₹1,00,000') && p > 100000) return true;
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === 'popular') return b.popular ? 1 : -1;
      if (sort === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sort === 'price-desc') return b.startingPrice - a.startingPrice;
      // Mock duration sort by parsing first number
      if (sort === 'duration-asc') return parseInt(a.duration) - parseInt(b.duration);
      if (sort === 'duration-desc') return parseInt(b.duration) - parseInt(a.duration);
      return 0; // recommended
    });
  }, [searchQuery, activeFilters, sort]);

  const activeChips = Object.entries(activeFilters).flatMap(([key, values]) => 
    values.map(val => ({ key, val }))
  );

  const featured = domesticDestinations.filter(d => d.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Domestic Destinations' }]} />
        <DestinationHero />
        
        <Container className="py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <DestinationFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <DestinationSearch value={searchQuery} onChange={(v) => { setSearchQuery(v); setVisibleCount(8); }} />
                <DestinationSort value={sort} onChange={setSort} />
              </div>

              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeChips.map(({ key, val }) => (
                    <span key={val} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {val}
                      <button onClick={() => removeFilter(key, val)} className="ml-2 hover:bg-primary/20 rounded-full p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <button onClick={handleClearAll} className="text-sm font-medium text-gray-500 hover:text-gray-700 px-2 underline">Clear All</button>
                </div>
              )}

              {/* Show featured only if no filters/search are active and it's recommended sort */}
              {!searchQuery && activeChips.length === 0 && sort === 'recommended' && (
                <FeaturedDestinations destinations={featured} />
              )}

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{filteredDestinations.length} destinations found</h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => <DestinationCardSkeleton key={i} />)}
                </div>
              ) : filteredDestinations.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
                  <p className="text-gray-500 mb-6">Try changing your filters or search for another destination.</p>
                  <button onClick={handleClearAll} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-medium transition-colors">Clear Filters</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDestinations.slice(0, visibleCount).map((dest) => (
                      <DestinationCard key={dest.id} destination={dest} />
                    ))}
                  </div>
                  
                  {visibleCount < filteredDestinations.length && (
                    <div className="mt-12 text-center">
                      <p className="text-sm text-gray-500 mb-4">Showing {visibleCount} of {filteredDestinations.length} destinations</p>
                      <button onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => { setVisibleCount(v => v + 8); setIsLoading(false); }, 500);
                      }} className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
        
        <TravelCTA />
      </main>
      <Footer />
    </div>
  );
};
export default DomesticDestinations;
