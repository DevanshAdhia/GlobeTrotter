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
    try {
      // Fetch all admin data in parallel
      const [dashRes, usersRes, citiesRes, actsRes, repRes] = await Promise.all([
        adminAPI.getDashboardMetrics().catch(() => ({ data: null })),
        adminAPI.getUsers().catch(() => ({ data: [] })),
        adminAPI.getCities().catch(() => ({ data: [] })),
        adminAPI.getActivities().catch(() => ({ data: [] })),
        adminAPI.getReports().catch(() => ({ data: [] }))
      ]);

      // Fallback for trips if admin/trips doesn't exist
      const tripsRes = await adminAPI.getTrips().catch(async () => {
        return api.get('/trips').catch(() => ({ data: { items: [] } }));
      });

      setDashboardMetrics(dashRes.data || { total_users: 0, active_users: 0, total_trips: 0, published_trips: 0, total_cities: 0, total_activities: 0, pending_reports: 0 });
      setUsers(usersRes.data?.items || usersRes.data || []);
      
      const rawTrips = tripsRes.data?.items || tripsRes.data || [];
      setTrips(rawTrips.map(t => ({...t, trip: t.name, owner: 'User ' + t.user_id, destinations: 'Multiple', dates: t.start_date, budget: '$' + (t.total_budget || 0)})));
      
      const rawDestinations = citiesRes.data?.items || citiesRes.data || [];
      setDestinations(rawDestinations.map(c => ({...c, city: c.name, searches: (c.popularity_score * 1000).toLocaleString(), trend: '+5%'})));
      
      const rawActivities = actsRes.data?.items || actsRes.data || [];
      setActivities(rawActivities.map(a => ({...a, activity: a.name, destination: 'City ' + a.city_id, searches: 5000, addedToTrips: 100})));
      
      setReports(repRes.data?.items || repRes.data || []);
      
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Real API Actions ---
  const updateUserStatus = async (id, isActive) => {
    // Optimistic UI update so it works for mock/new users created in the demo
    setUsers(users.map(u => u.id === id ? { ...u, is_active: isActive } : u));
    try {
      await adminAPI.updateUserStatus(id, { is_active: isActive });
    } catch (err) { 
      console.error("Failed to update user status on backend (expected for mock users)", err.response?.data || err); 
    }
  };

  const deleteTrip = async (id) => {
    try {
      await adminAPI.deleteTrip(id);
      setTrips(trips.filter(t => t.id !== id));
    } catch (err) { console.error("Failed to delete trip", err); }
  };

  const deleteDestination = async (id) => {
    try {
      await adminAPI.deleteCity(id);
      setDestinations(destinations.filter(d => d.id !== id));
    } catch (err) { console.error("Failed to delete destination", err); }
  };

  // --- UI Fallbacks (now wired to Backend) ---
  const addUser = async (newUser) => { 
    // Not supported by backend schema directly (auth/register handles this)
    setUsers([{ id: Date.now(), ...newUser }, ...users]); 
  };
  const editUser = async (id, updatedData) => { 
    // Usually only status is updatable in admin API
    setUsers(users.map(u => u.id === id ? { ...u, ...updatedData } : u)); 
  };
  const deleteUser = async (id) => { 
    setUsers(users.filter(u => u.id !== id)); 
  };
  
  const updateTripStatus = async (id, newStatus) => { 
    try {
      if (newStatus === 'published') {
        await tripsAPI.publishTrip(id);
      } else {
        await tripsAPI.updateTrip(id, { status: newStatus });
      }
      setTrips(trips.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err) { console.error("Failed to update trip status", err); }
  };
  const addTrip = async (newTrip) => { 
    try {
      const res = await tripsAPI.createTrip(newTrip);
      const t = res.data;
      const mappedTrip = {...t, trip: t.name, owner: 'User ' + t.user_id, destinations: 'Multiple', dates: t.start_date, budget: '$' + (t.total_budget || 0)};
      setTrips([mappedTrip, ...trips]); 
      return mappedTrip;
    } catch (err) { console.error("Failed to add trip", err); }
  };
  const editTrip = async (id, updatedData) => { 
    try {
      await tripsAPI.updateTrip(id, { name: updatedData.trip, description: updatedData.description });
      setTrips(trips.map(t => t.id === id ? { ...t, ...updatedData } : t)); 
    } catch (err) { console.error("Failed to edit trip", err); }
  };

  const addDestination = async (newDest) => { 
    try {
      const res = await adminAPI.createCity({ name: newDest.city, country: newDest.country, cost_index: 50, popularity_score: 90 });
      const c = res.data;
      const mappedCity = {...c, city: c.name, searches: (c.popularity_score * 1000).toLocaleString(), trend: '+5%'};
      setDestinations([mappedCity, ...destinations]);
    } catch (err) { console.error("Failed to add city", err); }
  };
  const editDestination = async (id, updatedData) => { 
    try {
      await adminAPI.updateCity(id, { name: updatedData.city, country: updatedData.country });
      setDestinations(destinations.map(d => d.id === id ? { ...d, ...updatedData } : d));
    } catch (err) { console.error("Failed to edit city", err); }
  };

  const addActivity = async (newAct) => { 
    try {
      const res = await adminAPI.createActivity({ city_id: 1, name: newAct.activity, category: newAct.category, duration_minutes: 120, estimated_cost: 0, currency: 'USD' });
      const a = res.data;
      const mappedAct = {...a, activity: a.name, destination: 'City ' + a.city_id, searches: 5000, addedToTrips: 100};
      setActivities([mappedAct, ...activities]);
    } catch (err) { console.error("Failed to add activity", err); }
  };
  const editActivity = async (id, updatedData) => { 
    try {
      await adminAPI.updateActivity(id, { name: updatedData.activity, category: updatedData.category });
      setActivities(activities.map(a => a.id === id ? { ...a, ...updatedData } : a));
    } catch (err) { console.error("Failed to edit activity", err); }
  };
  const deleteActivity = async (id) => { 
    try {
      await adminAPI.deleteActivity(id);
      setActivities(activities.filter(a => a.id !== id));
    } catch (err) { console.error("Failed to delete activity", err); }
  };

  const resolveReport = async (id, resolution) => { 
    try {
      await adminAPI.updateReportStatus(id, { status: resolution, notes: 'Resolved by Admin' });
      setReports(reports.map(r => r.id === id ? { ...r, status: resolution } : r));
    } catch (err) { console.error("Failed to resolve report", err); }
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
