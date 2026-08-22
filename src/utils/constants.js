/**
 * utils/constants.js
 * App-wide constants — no magic strings/numbers in components.
 */

export const APP_NAME = 'GlobeTrotter';

/* API */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/* Routes */
export const ROUTES = {
  HOME:         '/',
  LOGIN:        '/login',
  SIGNUP:       '/signup',
  FORGOT:       '/forgot-password',
  DASHBOARD:    '/dashboard',
  TRIPS:        '/trips',
  TRIP_NEW:     '/trips/new',
  TRIP:         (id) => `/trips/${id}`,
  TRIP_EDIT:    (id) => `/trips/${id}/edit`,
  TRIP_PLAN:    (id) => `/trips/${id}/plan`,
  DESTINATIONS: '/destinations',
  ACTIVITIES:   '/activities',
  COMMUNITY:    '/community',
  PROFILE:      '/profile',
  SETTINGS:     '/settings',
};

/* Trip */
export const TRIP_VISIBILITY = {
  PRIVATE:      'private',
  FRIENDS:      'friends',
  PUBLIC:       'public',
};

export const TRAVEL_TYPES = [
  { value: 'solo',     label: 'Solo',     icon: '🧳' },
  { value: 'couple',   label: 'Couple',   icon: '💑' },
  { value: 'family',   label: 'Family',   icon: '👨‍👩‍👧‍👦' },
  { value: 'friends',  label: 'Friends',  icon: '👥' },
  { value: 'business', label: 'Business', icon: '💼' },
];

export const TRAVEL_STYLES = [
  { value: 'adventure',  label: 'Adventure',  icon: '🧗' },
  { value: 'food',       label: 'Food',       icon: '🍜' },
  { value: 'culture',    label: 'Culture',    icon: '🏛️' },
  { value: 'nature',     label: 'Nature',     icon: '🌿' },
  { value: 'shopping',   label: 'Shopping',   icon: '🛍️' },
  { value: 'luxury',     label: 'Luxury',     icon: '✨' },
  { value: 'budget',     label: 'Budget',     icon: '💰' },
];

export const TRAVEL_PACES = [
  { value: 'relaxed',  label: 'Relaxed',  desc: '2–3 activities/day'  },
  { value: 'balanced', label: 'Balanced', desc: '4–5 activities/day'  },
  { value: 'fast',     label: 'Fast',     desc: '6+ activities/day'   },
];

/* Activity */
export const ACTIVITY_CATEGORIES = [
  { value: 'sightseeing',   label: 'Sightseeing',    icon: '🏛️' },
  { value: 'food',          label: 'Food & Dining',  icon: '🍽️' },
  { value: 'adventure',     label: 'Adventure',      icon: '🧗' },
  { value: 'culture',       label: 'Culture',        icon: '🎭' },
  { value: 'nature',        label: 'Nature',         icon: '🌿' },
  { value: 'shopping',      label: 'Shopping',       icon: '🛍️' },
  { value: 'entertainment', label: 'Entertainment',  icon: '🎡' },
  { value: 'transport',     label: 'Transport',      icon: '🚆' },
  { value: 'accommodation', label: 'Accommodation',  icon: '🏨' },
];

/* Expense */
export const EXPENSE_CATEGORIES = [
  { value: 'transport',      label: 'Transport',      icon: '✈️',  color: '#3b82f6' },
  { value: 'accommodation',  label: 'Accommodation',  icon: '🏨',  color: '#8b5cf6' },
  { value: 'food',           label: 'Food & Dining',  icon: '🍽️', color: '#f59e0b' },
  { value: 'activities',     label: 'Activities',     icon: '🎯',  color: '#10b981' },
  { value: 'shopping',       label: 'Shopping',       icon: '🛍️', color: '#ec4899' },
  { value: 'misc',           label: 'Miscellaneous',  icon: '💸',  color: '#6b7280' },
];

/* Collaboration roles */
export const MEMBER_ROLES = {
  OWNER:  'owner',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

/* UI */
export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
};
