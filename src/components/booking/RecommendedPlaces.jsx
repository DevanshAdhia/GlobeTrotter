import React, { useState } from 'react';
import { RecommendedPlaceCard } from './RecommendedPlaceCard';

export const RecommendedPlaces = ({ destination, places, includedPlaces, selectedPlaces, setSelectedPlaces }) => {
  const [search, setSearch] = useState('');
  
  if (!places || places.length === 0) {
    return (
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Places in {destination.name}</h3>
        <p className="text-gray-500 text-sm">No places are available for this destination right now.</p>
      </div>
    );
  }

  const filteredPlaces = places.filter(place => 
    place.name.toLowerCase().includes(search.toLowerCase()) ||
    place.category.toLowerCase().includes(search.toLowerCase())
  );

  const togglePlace = (id) => {
    if (selectedPlaces.includes(id)) {
      setSelectedPlaces(selectedPlaces.filter(pId => pId !== id));
    } else {
      setSelectedPlaces([...selectedPlaces, id]);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-900">Recommended Places in {destination.name}</h3>
        {places.length > 4 && (
          <input 
            type="text"
            placeholder={`Search ${destination.name} places...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlaces.map(place => (
          <RecommendedPlaceCard 
            key={place.id}
            place={place}
            isIncluded={includedPlaces.includes(place.id)}
            isSelected={selectedPlaces.includes(place.id)}
            onToggle={togglePlace}
          />
        ))}
      </div>
      
      {filteredPlaces.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No places found matching your search.</p>
        </div>
      )}
    </div>
  );
};
