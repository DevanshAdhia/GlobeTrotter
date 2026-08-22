import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, SearchX, AlertCircle } from 'lucide-react';
import Topbar from '../../components/layout/Topbar';
import Footer from '../../components/layout/Footer';
import Container from '../../components/common/Container';
import Breadcrumb from '../../components/common/Breadcrumb';
import WeekendHero from '../../components/weekend/WeekendHero';
import WeekendTripPlanner from '../../components/weekend/WeekendTripPlanner';
import WeekendCategories from '../../components/weekend/WeekendCategories';
import WeekendGatewayCard from '../../components/weekend/WeekendGatewayCard';
import WeekendGatewaySkeleton from '../../components/weekend/WeekendGatewaySkeleton';
import WeekendFilters from '../../components/weekend/WeekendFilters';
import WeekendDestinationSearch from '../../components/weekend/WeekendDestinationSearch';
import WeekendSort from '../../components/weekend/WeekendSort';
import WeekendPlanningCTA from '../../components/weekend/WeekendPlanningCTA';
import { weekendGateways } from '../../data/weekendGateways';

const parseTravelTime = (timeStr) => {
  if (!timeStr) return 9999;
  const match = timeStr.match(/(\d+)h(?:\s*(\d+)m)?/);
  if (!match) return 9999;
  return parseInt(match[1]) * 60 + (parseInt(match[2]) || 0);
};

const WeekendGateways = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  
  // Planner state mapped from URL
  const [planner, setPlanner] = useState({
    from: searchParams.get('from') || '',
    dates: searchParams.get('dates') || '',
    duration: searchParams.get('duration') || '2 Days',
    adults: searchParams.get('adults') || '2',
    children: searchParams.get('children') || '0',
    infants: searchParams.get('infants') || '0',
    type: searchParams.get('type') || 'Any Type',
    budget: searchParams.get('budget') || 'Any Budget'
  });
  const [hasSearched, setHasSearched] = useState(!!searchParams.get('from'));

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  
  // Advanced filters mapped from URL
  const initialFilters = {};
  for (let [key, value] of searchParams.entries()) {
    if (['travelTime', 'bestFor', 'season', 'tripType', 'durationFilter', 'budgetFilter'].includes(key)) {
      initialFilters[key] = value.split(',');
    }
  }
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(false); // don't load immediately until searched or on mount if already searched
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (hasSearched) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, activeFilters, sort, planner, hasSearched]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (planner.from) params.set('from', planner.from);
    if (planner.dates) params.set('dates', planner.dates);
    if (planner.duration && planner.duration !== '2 Days') params.set('duration', planner.duration);
    if (planner.adults && planner.adults !== '2') params.set('adults', planner.adults);
    if (planner.children && planner.children !== '0') params.set('children', planner.children);
    if (planner.infants && planner.infants !== '0') params.set('infants', planner.infants);
    if (planner.type && planner.type !== 'Any Type') params.set('type', planner.type);
    if (planner.budget && planner.budget !== 'Any Budget') params.set('budget', planner.budget);
    
    if (searchQuery) params.set('search', searchQuery);
    if (sort !== 'recommended') params.set('sort', sort);
    
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values && values.length > 0) params.set(key, values.join(','));
    });
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeFilters, sort, planner, setSearchParams]);

  const handlePlannerSearch = (data) => {
    setPlanner(data);
    setHasSearched(true);
    setVisibleCount(8);
    // Sync planner values into activeFilters for unified logic
    const newFilters = { ...activeFilters };
    if (data.type && data.type !== 'Any Type') {
      newFilters.tripType = Array.from(new Set([...(newFilters.tripType || []), data.type]));
    }
    if (data.budget && data.budget !== 'Any Budget') {
      newFilters.budgetFilter = Array.from(new Set([...(newFilters.budgetFilter || []), data.budget]));
    }
    if (data.duration) {
      newFilters.durationFilter = Array.from(new Set([...(newFilters.durationFilter || []), data.duration]));
    }
    setActiveFilters(newFilters);
    if (gridRef.current) gridRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryTitle) => {
    handlePlannerSearch({ ...planner, type: categoryTitle });
  };

  const handleFilterChange = (key, values) => {
    setActiveFilters(prev => ({ ...prev, [key]: values }));
    setVisibleCount(8);
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setSort('recommended');
    setVisibleCount(8);
  };

  const removeFilter = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: prev[key].filter(v => v !== value) }));
  };

  const filteredDestinations = useMemo(() => {
    let result = weekendGateways;
    // Base planner filter: Origin City
    if (planner.from) {
      result = result.filter(dest => dest.fromCities.includes(planner.from));
    }
    
    result = result.filter(dest => {
      if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilters.tripType?.length > 0 && !activeFilters.tripType.some(t => dest.tripTypes.includes(t))) return false;
      if (activeFilters.bestFor?.length > 0 && !activeFilters.bestFor.some(t => dest.bestFor.includes(t))) return false;
      if (activeFilters.season?.length > 0 && !activeFilters.season.some(t => dest.bestSeason.includes(t))) return false;
      if (activeFilters.durationFilter?.length > 0 && !activeFilters.durationFilter.includes(dest.duration)) return false;
      
      if (activeFilters.travelTime?.length > 0 && planner.from) {
        const timeStr = dest.travelTime[planner.from];
        if (!timeStr) return false;
        const mins = parseTravelTime(timeStr);
        const isMatch = activeFilters.travelTime.some(t => {
          if (t === 'Under 2 Hours' && mins < 120) return true;
          if (t === '2–4 Hours' && mins >= 120 && mins <= 240) return true;
          if (t === '4–6 Hours' && mins > 240 && mins <= 360) return true;
          if (t === '6+ Hours' && mins > 360) return true;
          return false;
        });
        if (!isMatch) return false;
      }
      
      if (activeFilters.budgetFilter?.length > 0) {
        const p = dest.startingPrice;
        if (activeFilters.budgetFilter.includes('Under ₹5,000') && p < 5000) return true;
        if (activeFilters.budgetFilter.includes('₹5,000 – ₹10,000') && p >= 5000 && p <= 10000) return true;
        if (activeFilters.budgetFilter.includes('₹10,000 – ₹20,000') && p > 10000 && p <= 20000) return true;
        if (activeFilters.budgetFilter.includes('₹20,000+') && p > 20000) return true;
        return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (sort === 'popular') return b.popular ? 1 : -1;
      if (sort === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'travel-time' && planner.from) {
        return parseTravelTime(a.travelTime[planner.from]) - parseTravelTime(b.travelTime[planner.from]);
      }
      return 0; // recommended
    });
  }, [searchQuery, activeFilters, sort, planner]);

  const activeChips = Object.entries(activeFilters).flatMap(([key, values]) => values.map(val => ({ key, val })));
  
  // Show popular destinations if no search made yet
  const displayDestinations = hasSearched ? filteredDestinations : weekendGateways.filter(d => d.popular).slice(0, 6);
  const resultHeader = hasSearched ? (planner.from ? `Weekend getaways from ${planner.from}` : 'Weekend getaways') : 'Popular Weekend Getaways';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <main className="flex-1">
        <Breadcrumb items={[{ label: 'Weekend Gateways' }]} />
        <WeekendHero />
        <WeekendTripPlanner onSearch={handlePlannerSearch} initialValues={planner} />
        
        <Container className="py-12">
          {!hasSearched && <WeekendCategories onSelectCategory={handleSelectCategory} />}
          
          <div ref={gridRef} className="pt-4">
            {hasSearched ? (
              <div className="flex flex-col lg:flex-row gap-8">
                <WeekendFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} onClearAll={handleClearAllFilters} />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                    <WeekendDestinationSearch value={searchQuery} onChange={(v) => { setSearchQuery(v); setVisibleCount(8); }} />
                    <WeekendSort value={sort} onChange={setSort} />
                  </div>
                  
                  {activeChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {planner.from && <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">From: {planner.from}</span>}
                      {activeChips.map(({ key, val }) => (
                        <span key={val} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {val}
                          <button onClick={() => removeFilter(key, val)} aria-label={`Remove ${val} filter`} className="ml-2 hover:bg-primary/20 rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                      <button onClick={handleClearAllFilters} className="text-sm font-medium text-gray-500 hover:text-gray-700 px-2 underline focus:outline-none">Clear All</button>
                    </div>
                  )}
                  
                  <div className="mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{resultHeader}</h2>
                    <p className="text-gray-500 mt-1">{filteredDestinations.length} getaways found</p>
                  </div>
                  
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => <WeekendGatewaySkeleton key={i} />)}
                    </div>
                  ) : filteredDestinations.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No weekend getaways found</h3>
                      <p className="text-gray-500 mb-6">Try changing your dates, budget or travel preferences.</p>
                      <button onClick={handleClearAllFilters} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-medium transition-colors">Clear Filters</button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredDestinations.slice(0, visibleCount).map((dest) => (
                          <WeekendGatewayCard key={dest.id} destination={dest} selectedCity={planner.from} />
                        ))}
                      </div>
                      {visibleCount < filteredDestinations.length && (
                        <div className="mt-12 text-center">
                          <p className="text-sm text-gray-500 mb-4 font-medium">Showing {visibleCount} of {filteredDestinations.length} getaways</p>
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
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{resultHeader}</h2>
                  <p className="text-gray-500 mt-1">Short trips that are easy to plan and hard to forget.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayDestinations.map((dest) => (
                    <WeekendGatewayCard key={dest.id} destination={dest} selectedCity={null} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
        
        <WeekendPlanningCTA />
      </main>
      <Footer />
    </div>
  );
};
export default WeekendGateways;