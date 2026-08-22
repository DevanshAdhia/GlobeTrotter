/**
 * pages/Discover/Discover.jsx
 * The main AI recommendation experience page.
 * Orchestrates: PreferenceCollector -> AILoadingState -> Recommendations
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Sparkles, Gem, Wallet, TrendingUp, Search } from 'lucide-react';
import { useTripContext } from '../../context/TripContext';
import { destinations } from '../../data/destinations';

import { PreferenceCollector } from '../../components/ai/PreferenceCollector';
import { AILoadingState } from '../../components/ai/AILoadingState';
import { RecommendationSection } from '../../components/ai/RecommendationSection';
import { ItineraryPanel } from '../../components/ai/ItineraryPanel';

const Discover = () => {
  const { destinationSlug } = useParams();
  const navigate = useNavigate();
  const { ctx, setDestination, setPreferences, recommendations } = useTripContext();
  
  const [loading, setLoading] = useState(false);

  const destination = destinations.find(d => d.slug === destinationSlug);

  // Sync route destination with context
  useEffect(() => {
    if (destination && ctx.destinationSlug !== destination.slug) {
      setDestination(destination.slug, destination.name);
    }
  }, [destination, ctx.destinationSlug, setDestination]);

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 text-center text-gray-500">
        Destination not found. <button onClick={() => navigate('/')} className="text-primary underline">Go home</button>
      </div>
    );
  }

  const handlePreferencesComplete = (prefs) => {
    setPreferences(prefs);
    setLoading(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20 pb-32">
      <AnimatePresence mode="wait">
        
        {/* State 1: Collect Preferences */}
        {!ctx.preferencesCollected && !loading && (
          <motion.div key="collector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PreferenceCollector 
              destinationName={destination.name} 
              onComplete={handlePreferencesComplete} 
            />
          </motion.div>
        )}

        {/* State 2: AI Loading */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AILoadingState destination={destination.name} />
          </motion.div>
        )}

        {/* State 3: Recommendations Dashboard */}
        {ctx.preferencesCollected && !loading && recommendations && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Main Content Area */}
              <div className="flex-1 w-full min-w-0">
                {/* Header */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> Personalized for you
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Your {destination.name} Trip
                  </h1>
                  <p className="text-gray-500 text-lg">
                    We've found the perfect matches based on your {ctx.travelStyle?.toLowerCase()} style and interests.
                  </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-12">
                  <RecommendationSection 
                    title="Best Matches for You" 
                    subtitle="Highly recommended based on your specific interests."
                    icon={<Sparkles className="text-primary w-6 h-6" />}
                    items={recommendations.bestMatches} 
                    emptyMessage="We need more signals to find your perfect matches."
                  />
                  
                  <RecommendationSection 
                    title="Hidden Gems" 
                    subtitle="Lesser-known spots you might love."
                    icon={<Gem className="text-purple-500 w-6 h-6" />}
                    items={recommendations.hiddenGems} 
                    horizontal
                  />
                  
                  <RecommendationSection 
                    title="Must Visit in Goa" 
                    subtitle="The absolute classics that fit your trip."
                    icon={<Map className="text-amber-500 w-6 h-6" />}
                    items={recommendations.mustVisit} 
                  />

                  <RecommendationSection 
                    title="Budget Friendly" 
                    subtitle={`Great options under ₹${ctx.budgetPP.toLocaleString('en-IN')}/person.`}
                    icon={<Wallet className="text-green-500 w-6 h-6" />}
                    items={recommendations.budgetFriendly} 
                    horizontal
                  />

                  <RecommendationSection 
                    title="Popular Right Now" 
                    subtitle="What other travellers are loving."
                    icon={<TrendingUp className="text-blue-500 w-6 h-6" />}
                    items={recommendations.popular} 
                    horizontal
                  />

                  <RecommendationSection 
                    title="Explore More" 
                    subtitle="Other options in the area."
                    icon={<Search className="text-gray-400 w-6 h-6" />}
                    items={recommendations.all.slice(6, 12)} 
                  />
                </div>
              </div>

              {/* Sidebar */}
              <ItineraryPanel />

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Discover;
