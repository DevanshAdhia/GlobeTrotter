import React, { useState } from 'react';
import PackageItineraryDay from './PackageItineraryDay';

const PackageItinerary = ({ itinerary }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!itinerary || itinerary.length === 0) return null;

  const visibleDays = showAll ? itinerary : itinerary.slice(0, 3);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Day-by-Day Itinerary</h2>
      
      <div className="relative">
        {visibleDays.map((day, index) => (
          <PackageItineraryDay key={index} dayData={day} isLast={index === itinerary.length - 1} />
        ))}
      </div>
      
      {itinerary.length > 3 && (
        <button onClick={() => setShowAll(!showAll)} className="mt-2 ml-8 md:ml-12 text-primary font-bold focus:outline-none focus-visible:underline hover:text-primary-dark">
          {showAll ? 'Show Less' : 'View Full Itinerary'}
        </button>
      )}
    </section>
  );
};
export default PackageItinerary;