import { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI, tripsAPI } from '../services/api';
import api from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [reports, setReports] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: '24 trips reported today.', icon: 'alert', read: false, time: '2 hours ago' },
    { id: 2, text: 'Tokyo searches increased 32%.', icon: 'trend', read: false, time: '4 hours ago' }
  ]);

  const fetchData = async () => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // DUMMY DATA FOR DASHBOARD
      const dummyMetrics = {
        total_users: 1245,
        active_users: 892,
        total_trips: 342,
        published_trips: 156,
        total_cities: 48,
        total_activities: 210,
        pending_reports: 5
      };

      const dummyUsers = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'user', is_active: true },
        { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'user', is_active: true },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'admin', is_active: false },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'user', is_active: true },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'user', is_active: true },
      ];

      const dummyTrips = [
        { id: 101, name: 'Euro Summer', user_id: 1, start_date: '2026-06-15', end_date: '2026-07-01', currency: '$', total_budget: 4500, status: 'published', stops: [1,2,3] },
        { id: 102, name: 'Tokyo Adventure', user_id: 2, start_date: '2026-09-10', end_date: '2026-09-24', currency: '$', total_budget: 3200, status: 'draft', stops: [1,2] },
        { id: 103, name: 'Bali Retreat', user_id: 4, start_date: '2026-05-01', end_date: '2026-05-10', currency: '$', total_budget: 1800, status: 'published', stops: [1] },
        { id: 104, name: 'New York Weekend', user_id: 5, start_date: '2026-11-20', end_date: '2026-11-23', currency: '$', total_budget: 1200, status: 'published', stops: [1] },
      ];

      const dummyCities = [
        { id: 201, name: 'Paris', country: 'France', popularity_score: 95, image: 'https://images.unsplash.com/photo-1502602898657-3e90760020c6?w=400' },
        { id: 202, name: 'Tokyo', country: 'Japan', popularity_score: 98, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400' },
        { id: 203, name: 'Bali', country: 'Indonesia', popularity_score: 88, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
        { id: 204, name: 'New York', country: 'USA', popularity_score: 92, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
      ];

      const dummyActivities = [
        { id: 301, name: 'Eiffel Tower Tour', city_id: 201, currency: '$', price: 45, rating: 4.8, category: 'Sightseeing' },
        { id: 302, name: 'Sushi Making Class', city_id: 202, currency: '$', price: 80, rating: 4.9, category: 'Food' },
        { id: 303, name: 'Scuba Diving', city_id: 203, currency: '$', price: 120, rating: 4.7, category: 'Adventure' },
        { id: 304, name: 'Broadway Show', city_id: 204, currency: '$', price: 150, rating: 4.9, category: 'Entertainment' },
      ];

      const dummyReports = [
        { id: 401, type: 'bug', status: 'pending', user: 'Alice Smith', message: 'Payment failed' },
        { id: 402, type: 'feedback', status: 'resolved', user: 'Bob Jones', message: 'Great app!' },
      ];

      setDashboardMetrics(dummyMetrics);
      setUsers(dummyUsers);
      
      setTrips(dummyTrips.map(t => ({...t, trip: t.name, owner: 'User ' + t.user_id, destinations: 'Multiple', dates: t.start_date, budget: t.currency + t.total_budget})));
      
      setDestinations(dummyCities.map(c => ({...c, city: c.name, searches: (c.popularity_score * 1000).toLocaleString(), trend: '+5%'})));
      
      setActivities(dummyActivities.map(a => ({...a, activity: a.name, destination: 'City ' + a.city_id, searches: 5000, addedToTrips: 100})));
      
      setReports(dummyReports);
      
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Real API Actions (Optimistically updated for mock UI) ---
  const updateUserStatus = async (id, isActive) => {
    setUsers(users.map(u => u.id === id ? { ...u, is_active: isActive } : u));
  };

  const deleteTrip = async (id) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const deleteDestination = async (id) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const addUser = async (newUser) => { 
    setUsers([{ id: Date.now(), ...newUser }, ...users]); 
  };
  
  const editUser = async (id, updatedData) => { 
    setUsers(users.map(u => u.id === id ? { ...u, ...updatedData } : u)); 
  };
  
  const deleteUser = async (id) => { 
    setUsers(users.filter(u => u.id !== id)); 
  };
  
  const updateTripStatus = async (id, newStatus) => { 
    setTrips(trips.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };
  
  const addTrip = async (newTrip) => { 
    const mappedTrip = {id: Date.now(), ...newTrip, name: newTrip.trip, user_id: newTrip.owner, start_date: newTrip.dates, total_budget: newTrip.budget};
    setTrips([mappedTrip, ...trips]); 
    return mappedTrip;
  };
  
  const editTrip = async (id, updatedData) => { 
    setTrips(trips.map(t => t.id === id ? { ...t, ...updatedData, name: updatedData.trip || t.name } : t)); 
  };

  const addDestination = async (newDest) => { 
    const mappedCity = {id: Date.now(), name: newDest.city, country: newDest.country, popularity_score: 90, searches: '90,000', trend: '+5%'};
    setDestinations([mappedCity, ...destinations]);
  };
  
  const editDestination = async (id, updatedData) => { 
    setDestinations(destinations.map(d => d.id === id ? { ...d, ...updatedData, name: updatedData.city || d.name } : d));
  };

  const addActivity = async (newAct) => { 
    const mappedAct = {id: Date.now(), name: newAct.activity, category: newAct.category, city_id: 1, price: 0, rating: 5.0};
    setActivities([mappedAct, ...activities]);
  };
  
  const editActivity = async (id, updatedData) => { 
    setActivities(activities.map(a => a.id === id ? { ...a, ...updatedData, name: updatedData.activity || a.name } : a));
  };
  
  const deleteActivity = async (id) => { 
    setActivities(activities.filter(a => a.id !== id));
  };

  const resolveReport = async (id, resolution) => { 
    setReports(reports.map(r => r.id === id ? { ...r, status: resolution } : r));
  };
  
  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AdminContext.Provider value={{
      isLoading, dashboardMetrics,
      users, setUsers, updateUserStatus, addUser, editUser, deleteUser,
      trips, setTrips, updateTripStatus, addTrip, editTrip, deleteTrip,
      destinations, addDestination, editDestination, deleteDestination,
      activities, addActivity, editActivity, deleteActivity,
      reports, resolveReport,
      notifications, markNotificationRead,
      refreshData: fetchData
    }}>
      {children}
    </AdminContext.Provider>
  );
};
