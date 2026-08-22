import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import UserDetails from './pages/admin/UserDetails';
import Trips from './pages/admin/Trips';
import TripDetails from './pages/admin/TripDetails';
import Destinations from './pages/admin/Destinations';
import DestinationDetails from './pages/admin/DestinationDetails';
import Activities from './pages/admin/Activities';
import ActivityDetails from './pages/admin/ActivityDetails';
import PublicTrips from './pages/admin/PublicTrips';
import Reports from './pages/admin/Reports';
import Analytics from './pages/admin/Analytics';
import Notifications from './pages/admin/Notifications';
import Settings from './pages/admin/Settings';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Placeholder for client-side app root */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            
            <Route path="trips" element={<Trips />} />
            <Route path="trips/:id" element={<TripDetails />} />
            
            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/:id" element={<DestinationDetails />} />
            
            <Route path="activities" element={<Activities />} />
            <Route path="activities/:id" element={<ActivityDetails />} />
            
            <Route path="public-trips" element={<PublicTrips />} />
            <Route path="reports" element={<Reports />} />
            
            <Route path="analytics" element={<Analytics />} />
            <Route path="insights/destinations" element={<Navigate to="/admin/destinations" replace />} />
            <Route path="insights/activities" element={<Navigate to="/admin/activities" replace />} />
            
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
