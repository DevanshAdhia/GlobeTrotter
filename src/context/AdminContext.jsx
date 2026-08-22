import { createContext, useContext, useState } from 'react';
import { recentUsers } from '../data/users';
import { recentTrips } from '../data/trips';
import { trendingDestinations } from '../data/destinations';
import { popularActivities } from '../data/activities';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(recentUsers);
  const [trips, setTrips] = useState(recentTrips);
  const [destinations, setDestinations] = useState(trendingDestinations);
  const [activities, setActivities] = useState(popularActivities);
  const [reports, setReports] = useState([
    { id: 1, type: 'Trip', target: 'Europe Adventure', reason: 'Inappropriate content', reporter: 'User123', status: 'Pending', date: 'Aug 22, 2026' },
    { id: 2, type: 'User', target: 'Mike Johnson', reason: 'Spam activity', reporter: 'SysAdmin', status: 'Pending', date: 'Aug 21, 2026' }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: '24 trips reported today.', icon: 'alert', read: false, time: '2 hours ago' },
    { id: 2, text: 'Tokyo searches increased 32%.', icon: 'trend', read: false, time: '4 hours ago' },
    { id: 3, text: '1,240 new users joined this week.', icon: 'user', read: true, time: '1 day ago' },
    { id: 4, text: 'Paris is currently trending.', icon: 'fire', read: true, time: '2 days ago' },
    { id: 5, text: '12 content items require moderation.', icon: 'alert', read: true, time: '2 days ago' }
  ]);

  // Actions
  const updateUserStatus = (id, newStatus) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const addUser = (newUser) => {
    const id = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([{ id, ...newUser }, ...users]);
  };

  const editUser = (id, updatedData) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updatedData } : u));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };
  
  const updateTripStatus = (id, newStatus) => {
    setTrips(trips.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addTrip = (newTrip) => {
    const id = Math.max(...trips.map(t => t.id), 0) + 1;
    setTrips([{ id, ...newTrip }, ...trips]);
  };

  const editTrip = (id, updatedData) => {
    setTrips(trips.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const addDestination = (newDest) => {
    const id = Math.max(...destinations.map(d => d.id), 0) + 1;
    setDestinations([{ id, ...newDest }, ...destinations]);
  };

  const editDestination = (id, updatedData) => {
    setDestinations(destinations.map(d => d.id === id ? { ...d, ...updatedData } : d));
  };

  const deleteDestination = (id) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const addActivity = (newAct) => {
    const id = Math.max(...activities.map(a => a.id), 0) + 1;
    setActivities([{ id, ...newAct }, ...activities]);
  };

  const editActivity = (id, updatedData) => {
    setActivities(activities.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const resolveReport = (id, resolution) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: resolution } : r));
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AdminContext.Provider value={{
      users, setUsers, updateUserStatus, addUser, editUser, deleteUser,
      trips, setTrips, updateTripStatus, addTrip, editTrip, deleteTrip,
      destinations, addDestination, editDestination, deleteDestination,
      activities, addActivity, editActivity, deleteActivity,
      reports, resolveReport,
      notifications, markNotificationRead
    }}>
      {children}
    </AdminContext.Provider>
  );
};
