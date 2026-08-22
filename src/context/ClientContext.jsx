import { createContext, useContext, useState } from 'react';
import { recentTrips } from '../data/trips';
import { popularActivities } from '../data/activities';
import { trendingDestinations } from '../data/destinations';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Traveler',
    email: 'traveler@globetrotter.com',
    avatar: 'T'
  });
  
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
      owner: currentUser.name,
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
