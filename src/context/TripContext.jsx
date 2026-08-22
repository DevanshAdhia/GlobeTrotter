/**
 * context/TripContext.jsx
 * Global trip context — the single source of truth for the AI recommendation state.
 * Persists to localStorage so preferences survive page reloads.
 */
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { generateRecommendations } from '../engine/recommender';

const TripContext = createContext(null);
const STORAGE_KEY = 'amt_trip_context';

const DEFAULT_CONTEXT = {
  destinationSlug: '',
  destinationName: '',
  tripDuration: 4,
  budget: 30000,
  budgetPP: 15000,
  group: 'Couple',
  travelStyle: 'Relaxed',
  interests: [],
  likedIds: [],
  savedIds: [],
  skippedIds: [],
  itinerary: [],            // [{ id, name, day }]
  preferencesCollected: false,
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_CONTEXT, ...JSON.parse(raw) } : DEFAULT_CONTEXT;
  } catch { return DEFAULT_CONTEXT; }
}

export const TripProvider = ({ children }) => {
  const [ctx, setCtx] = useState(load);

  const persist = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const update = useCallback((patch) => {
    setCtx(prev => persist({ ...prev, ...patch }));
  }, []);

  const setDestination = useCallback((slug, name) =>
    setCtx(prev => persist({
      ...prev,
      destinationSlug: slug, destinationName: name,
      // Clear behavioural signals when destination changes
      likedIds: [], savedIds: [], skippedIds: [], itinerary: [],
      preferencesCollected: false,
    })), []);

  const setPreferences = useCallback((prefs) =>
    update({ ...prefs, preferencesCollected: true }), [update]);

  /* Behavioural signals — trigger re-scoring */
  const likeItem   = useCallback((id) => setCtx(prev => persist({
    ...prev, likedIds: [...new Set([...prev.likedIds, id])],
    skippedIds: prev.skippedIds.filter(s => s !== id),
  })), []);

  const saveItem   = useCallback((id) => setCtx(prev => persist({
    ...prev, savedIds: [...new Set([...prev.savedIds, id])],
  })), []);

  const unsaveItem = useCallback((id) => setCtx(prev => persist({
    ...prev, savedIds: prev.savedIds.filter(s => s !== id),
  })), []);

  const skipItem   = useCallback((id) => setCtx(prev => persist({
    ...prev, skippedIds: [...new Set([...prev.skippedIds, id])],
    likedIds: prev.likedIds.filter(l => l !== id),
  })), []);

  const addToItinerary = useCallback((item, day = 1) => setCtx(prev => {
    if (prev.itinerary.find(i => i.id === item.id)) return prev;
    return persist({ ...prev, itinerary: [...prev.itinerary, { ...item, day }] });
  }), []);

  const removeFromItinerary = useCallback((id) => setCtx(prev =>
    persist({ ...prev, itinerary: prev.itinerary.filter(i => i.id !== id) })), []);

  const resetTrip = useCallback(() => {
    const fresh = { ...DEFAULT_CONTEXT };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setCtx(fresh);
  }, []);

  /* Live recommendations — recomputed whenever context changes */
  const recommendations = useMemo(() => {
    if (!ctx.destinationSlug) return null;
    return generateRecommendations(ctx);
  }, [ctx]);

  const value = {
    ctx, update, setDestination, setPreferences,
    likeItem, saveItem, unsaveItem, skipItem,
    addToItinerary, removeFromItinerary, resetTrip,
    recommendations,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTripContext = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTripContext must be used inside TripProvider');
  return ctx;
};
