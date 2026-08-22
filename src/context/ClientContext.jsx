import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tripsAPI, discoveryAPI } from '../services/api';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentUser(null);
        return;
      }
      const response = await authAPI.getMe();
      setCurrentUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const [userTrips, setUserTrips] = useState([]);
  const [popularActivities, setPopularActivities] = useState([]);
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchData = async () => {
    try {
      const [tripsRes, citiesRes, actsRes] = await Promise.all([
        tripsAPI.listTrips().catch(() => ({ data: { items: [] } })),
        discoveryAPI.listCities({ page_size: 10 }).catch(() => ({ data: { items: [] } })),
        discoveryAPI.listActivities({ page_size: 10 }).catch(() => ({ data: { items: [] } }))
      ]);
      const rawTrips = tripsRes.data?.items || [];
      setUserTrips(rawTrips.map(t => ({...t, trip: t.name, owner: 'User ' + t.user_id, destinations: 'Multiple', dates: t.start_date, budget: '$' + (t.total_budget || 0)})));
      
      const rawDestinations = citiesRes.data?.items || [];
      setTrendingDestinations(rawDestinations.map(c => ({...c, city: c.name, searches: (c.popularity_score * 1000).toLocaleString(), trend: '+5%'})));
      
      const rawActivities = actsRes.data?.items || [];
      setPopularActivities(rawActivities.map(a => ({...a, activity: a.name, destination: 'City ' + a.city_id, city_id: a.city_id, searches: 5000, addedToTrips: 100})));
    } catch (err) {
      console.error("Failed to load client data", err);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchData(); // Fetch the backend data when the provider mounts
    
    // Listen for login/logout events from other components
    const handleAuthChange = () => {
      checkAuth();
      fetchData(); // Refetch data when auth changes
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  const createTrip = async (tripData) => {
    try {
      const response = await tripsAPI.createTrip({
        name: tripData.trip,
        description: '',
        start_date: tripData.dates ? tripData.dates.split(' - ')[0] : null,
        end_date: tripData.dates ? tripData.dates.split(' - ')[1] : null,
        travel_style: tripData.travel_style || 'balanced',
        total_budget: parseInt(tripData.budget) || 0,
        currency: 'USD'
      });
      setUserTrips([response.data, ...userTrips]);
      return response.data.id;
    } catch (err) {
      console.error("Failed to create trip", err);
      // Fallback for demo
      const mockId = Date.now();
      setUserTrips([{ id: mockId, name: tripData.trip, ...tripData }, ...userTrips]);
      return mockId;
    }
  };

  const getTrip = (id) => userTrips.find(t => t.id === parseInt(id));

  const deleteTrip = async (id) => {
    setUserTrips(userTrips.filter(t => t.id !== parseInt(id))); // Optimistic update
    try {
      await tripsAPI.deleteTrip(id);
    } catch (err) {
      console.error("Failed to delete trip on backend", err);
    }
  };

  return (
    <ClientContext.Provider value={{
      currentUser,
      setCurrentUser,
      authLoading,
      checkAuth,
      userTrips,
      createTrip,
      getTrip,
      deleteTrip,
      isDarkMode,
      toggleTheme,
      popularActivities,
      trendingDestinations,
      savedDestinations,
      setSavedDestinations
    }}>
      {children}
    </ClientContext.Provider>
  );
};
