import { useState, useEffect } from 'react';
import { destinations } from '../data/destinations';
import { places } from '../data/places';
import { activities } from '../data/activities';
import { packages } from '../data/packages';

export const useDestinationRecommendations = (destinationSlug, packageSlug) => {
  const [data, setData] = useState({
    destination: null,
    pkg: null,
    recommendedPlaces: [],
    recommendedActivities: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    const destination = destinations.find(d => d.slug === destinationSlug);
    if (!destination) {
      setData(prev => ({ ...prev, isLoading: false, error: 'Destination could not be loaded.' }));
      return;
    }

    const pkg = packages.find(p => p.slug === packageSlug && p.destinationSlug === destinationSlug);
    if (!pkg) {
      setData(prev => ({ ...prev, isLoading: false, error: 'This package is not available for this destination.' }));
      return;
    }

    const recPlaces = places.filter(p => p.destinationSlug === destinationSlug);
    const recActivities = activities.filter(a => a.destinationSlug === destinationSlug);

    setData({
      destination,
      pkg,
      recommendedPlaces: recPlaces,
      recommendedActivities: recActivities,
      isLoading: false,
      error: null
    });
  }, [destinationSlug, packageSlug]);

  return data;
};
