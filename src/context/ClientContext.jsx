import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { recentTrips } from '../data/trips';
import { popularActivities } from '../data/activities';
import { trendingDestinations } from '../data/destinations';

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

  useEffect(() => {
    checkAuth();
    
    // Listen for login/logout events from other components
    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  
  const [userTrips, setUserTrips] = useState(recentTrips.filter(t => t.visibility === 'Public' || t.owner === 'Traveler'));
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  const createTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      ...tripData,
      owner: currentUser ? currentUser.name : 'Guest',
      destinations: 'TBD',
      dates: 'TBD',
      budget: '$0',
      status: 'Draft',
      visibility: 'Private'
    };
    setUserTrips([newTrip, ...userTrips]);
    return newTrip.id;
  };

  const getTrip = (id) => userTrips.find(t => t.id === parseInt(id));

  const deleteTrip = (id) => {
    setUserTrips(userTrips.filter(t => t.id !== parseInt(id)));
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
