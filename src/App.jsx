/**
 * App.jsx — Combined Ajay Modi Travels Frontend + GlobalTrotter Admin Dashboard
 */
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { AdminProvider } from './context/AdminContext';
import { ClientProvider } from './context/ClientContext';

// Bharat's Routing
import ProtectedRoute from './components/auth/ProtectedRoute';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './routes/index';

// Devansh's Admin Routes
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
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

const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', flexDirection: 'column', gap: 16, background: '#fafafa',
  }}>
    <div style={{ fontSize: 36 }}>✈️</div>
    <div style={{
      width: 36, height: 36, border: '3px solid #e0eaff',
      borderTopColor: '#1d4ed8', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const NotFound = () => (
  <div style={{
    display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: 16, background: '#fafafa',
  }}>
    <div style={{ fontSize: 56 }}>🧭</div>
    <h1 style={{ fontSize: 28, fontWeight: 800 }}>404 — Page not found</h1>
    <p style={{ color: '#64748b' }}>This destination doesn&apos;t exist.</p>
    <a href="/" style={{ color: '#1d4ed8', fontWeight: 600 }}>← Back to Home</a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <AdminProvider>
          <ClientProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                gutter={10}
                containerStyle={{ top: 72 }}
                toastOptions={{ duration: 3500 }}
              />

              <Routes>
                {/* Bharat's Public routes */}
                {PUBLIC_ROUTES.map(({ path, element }) => (
                  <Route key={path} path={path} element={
                    <Suspense fallback={<PageLoader />}>{element}</Suspense>
                  } />
                ))}

                {/* Bharat's Protected routes */}
                {PROTECTED_ROUTES.map(({ path, element, children }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<PageLoader />}>{element}</Suspense>
                      </ProtectedRoute>
                    }
                  >
                    {children && children.map((child, idx) => (
                      <Route
                        key={idx}
                        index={child.index}
                        path={child.path}
                        element={
                          <Suspense fallback={<PageLoader />}>{child.element}</Suspense>
                        }
                      />
                    ))}
                  </Route>
                ))}

                {/* Devansh's Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
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

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ClientProvider>
        </AdminProvider>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
