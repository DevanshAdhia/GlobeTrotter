import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, SearchX, AlertCircle } from 'lucide-react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import InternationalHero from '../../components/international/InternationalHero';
import InternationalDestinationSearch from '../../components/international/InternationalDestinationSearch';
import InternationalFilters from '../../components/international/InternationalFilters';
import InternationalDestinationSort from '../../components/international/InternationalDestinationSort';
import TrendingInternational from '../../components/international/TrendingInternational';
import InternationalTravelStyles from '../../components/international/InternationalTravelStyles';
import InternationalDestinationCard from '../../components/international/InternationalDestinationCard';
import InternationalDestinationSkeleton from '../../components/international/InternationalDestinationSkeleton';
import InternationalCTA from '../../components/international/InternationalCTA';
import { internationalDestinations } from '../../data/internationalDestinations';

const InternationalDestinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  
  // Parse filters from URL
  const initialFilters = {};
  for (let [key, value] of searchParams.entries()) {
    if (['region', 'country', 'travelType', 'duration', 'budget', 'bestFor', 'season', 'visa'].includes(key)) {
      initialFilters[key] = value.split(',');
    }
  }
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    const timer = setTimeout(() => {
      // simulate rare error state randomly for robustness in real scenario, disabled for UI consistency here
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (sort !== 'recommended') params.set('sort', sort);
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values && values.length > 0) params.set(key, values.join(','));
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
  
  const handleSelectStyle = (styleId) => {
    // map styleId to filter array
    const styleMap = { beach: 'Beach', city: 'City', luxury: 'Luxury', honeymoon: 'Honeymoon', adventure: 'Adventure', family: 'Family' };
    const val = styleMap[styleId];
    if (val) {
      setActiveFilters(prev => ({ ...prev, travelType: prev.travelType?.includes(val) ? prev.travelType : [...(prev.travelType||[]), val] }));
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  const filteredDestinations = useMemo(() => {
    return internationalDestinations.filter(dest => {
      if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase()) && !dest.country.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilters.region?.length > 0 && !activeFilters.region.includes(dest.region)) return false;
      if (activeFilters.country?.length > 0 && !activeFilters.country.includes(dest.country)) return false;
      if (activeFilters.travelType?.length > 0 && !activeFilters.travelType.some(t => dest.travelTypes.includes(t))) return false;
      if (activeFilters.bestFor?.length > 0 && !activeFilters.bestFor.some(t => dest.bestFor.includes(t))) return false;
      if (activeFilters.season?.length > 0 && !activeFilters.season.some(t => dest.bestSeason.includes(t))) return false;
      if (activeFilters.visa?.length > 0 && !activeFilters.visa.includes(dest.visaType)) return false;
      
      if (activeFilters.duration?.length > 0) {
        // mock duration mapping
        const isMatch = activeFilters.duration.some(d => {
          if (d === '3–5 Days' && (dest.duration === '4–6 Days' || dest.duration === '3–5 Days' || dest.duration.startsWith('5'))) return true;
          if (d === '6–8 Days' && (dest.duration.startsWith('6') || dest.duration.startsWith('7'))) return true;
          if (d === '9–12 Days' && (dest.duration.startsWith('8') || dest.duration.startsWith('10'))) return true;
          if (d === '15+ Days' && dest.duration.startsWith('15')) return true;
          return false;
        });
        if (!isMatch) return false;
      }
      if (activeFilters.budget?.length > 0) {
        const p = dest.startingPrice;
        if (activeFilters.budget.includes('Under ₹50,000') && p < 50000) return true;
        if (activeFilters.budget.includes('₹50,000 – ₹1,00,000') && p >= 50000 && p <= 100000) return true;
        if (activeFilters.budget.includes('₹1,00,000 – ₹2,00,000') && p > 100000 && p <= 200000) return true;
        if (activeFilters.budget.includes('Above ₹2,00,000') && p > 200000) return true;
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === 'popular') return b.popular ? 1 : -1;
      if (sort === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sort === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'duration-asc') return parseInt(a.duration) - parseInt(b.duration);
      if (sort === 'duration-desc') return parseInt(b.duration) - parseInt(a.duration);
      return 0; // recommended
    });
  }, [searchQuery, activeFilters, sort]);

  const activeChips = Object.entries(activeFilters).flatMap(([key, values]) => 
    values.map(val => ({ key, val }))
  );

  const featured = internationalDestinations.filter(d => d.featured).slice(0, 3);
  const isDefaultState = !searchQuery && activeChips.length === 0 && sort === 'recommended';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'International Destinations' }]} />
        <InternationalHero />
        
        <Container className="py-12">
          {isDefaultState && <InternationalTravelStyles onSelectStyle={handleSelectStyle} />}
          
          <div className="flex flex-col lg:flex-row gap-8">
            <InternationalFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <InternationalDestinationSearch value={searchQuery} onChange={(v) => { setSearchQuery(v); setVisibleCount(8); }} />
                <InternationalDestinationSort value={sort} onChange={setSort} />
              </div>

              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="ml-2 hover:bg-gray-300 rounded-full p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {activeChips.map(({ key, val }) => (
                    <span key={val} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {val}
                      <button onClick={() => removeFilter(key, val)} aria-label={`Remove ${val} filter`} className="ml-2 hover:bg-primary/20 rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <button onClick={handleClearAll} className="text-sm font-medium text-gray-500 hover:text-gray-700 px-2 underline focus:outline-none">Clear All</button>
                </div>
              )}

              {isDefaultState && <TrendingInternational destinations={featured} />}

              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-gray-900">{filteredDestinations.length} international destinations</h2>
              </div>

              {hasError ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">We couldn't load destinations</h3>
                  <p className="text-gray-500 mb-6">Please try again.</p>
                  <button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-medium transition-colors">Retry</button>
                </div>
              ) : isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => <InternationalDestinationSkeleton key={i} />)}
                </div>
              ) : filteredDestinations.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations match your filters</h3>
                  <p className="text-gray-500 mb-6">Try changing your filters or exploring another region.</p>
                  <button onClick={handleClearAll} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-medium transition-colors">Clear Filters</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDestinations.slice(0, visibleCount).map((dest) => (
                      <InternationalDestinationCard key={dest.id} destination={dest} />
                    ))}
                  </div>
                  
                  {visibleCount < filteredDestinations.length && (
                    <div className="mt-12 text-center">
                      <p className="text-sm text-gray-500 mb-4 font-medium">Showing {visibleCount} of {filteredDestinations.length} destinations</p>
                      <button onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => { setVisibleCount(v => v + 8); setIsLoading(false); }, 600);
                      }} className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-3 rounded-xl font-bold transition-colors">
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
        
        <InternationalCTA />
      </main>
      <Footer />
    </div>
  );
};
export default InternationalDestinations;